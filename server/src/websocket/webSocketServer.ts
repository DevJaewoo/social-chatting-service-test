import { Server, Socket } from "socket.io";
import http from "http";
import {
  ChatSocket,
  ClientEvent,
  DirectChatRequest,
  InternalEvent,
  NoticeType,
  PublicRoomInfo,
  PublicRoomListInfo,
  RoomChatRequest,
  RoomChatResponse,
  RoomNotice,
  ServerEvent,
  UserInfo,
} from "./socketConstants.js";

const randomString = Math.floor(Math.random() * 1000000000).toString();

const webSocketServer = (httpServer: http.Server) => {
  const wsServer = new Server<
    ClientEvent,
    ServerEvent,
    InternalEvent,
    UserInfo
  >(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  let id: number = 0;
  let publicRooms: PublicRoomInfo[] = [];

  /**
   * Functions
   */

  const validateUser = (
    userInfo: UserInfo | Partial<UserInfo> | undefined
  ): boolean => {
    return userInfo?.id !== undefined;
  };

  const convertToUser = (user: Partial<UserInfo>): UserInfo => {
    return {
      id: user.id ?? 0,
      name: user.name ?? "",
      nickname: user.nickname ?? "",
      createdAt: user.createdAt ?? new Date(),
    };
  };

  const getPublicRoom = (name: string) =>
    publicRooms.find((r) => r.name === name);

  const getPublicRoomById = (id: number) =>
    publicRooms.find((r) => r.id === id);

  const getParticipantCount = (name: string): number => {
    return wsServer.sockets.adapter.rooms.get(name)?.size ?? 0;
  };

  const getPublicRoomList = (): PublicRoomListInfo[] => {
    console.log(`Public Room List: ${publicRooms}`);
    return publicRooms.map((p) => {
      return {
        id: p.id,
        name: p.name,
        participants: p.users.length,
      };
    });
  };

  // 모든 사용자에게 방 목록 공지
  const notifyRoomList = () => {
    wsServer.sockets.emit("roomList", getPublicRoomList());
  };

  const enterRoom = (socket: ChatSocket, name: string) => {
    // Private room 제외
    if (socket.rooms.size > 1) {
      socket.emit("error", "이미 다른 방에 참가중입니다.");
      return;
    }

    const room = getPublicRoom(name);
    console.log(`Socket ${socket.data.nickname} is entering room ${name}.`);

    if (room === undefined) {
      socket.emit("error", "존재하지 않는 방입니다.");
      return;
    }

    socket.join(name);
    room.users.push(convertToUser(socket.data));
    socket.emit("roomEnter", room);

    const notice: RoomNotice = {
      roomId: room.id,
      type: NoticeType.USER_ENTER,
      user: convertToUser(socket.data),
    };

    wsServer.to(name).emit("roomNotice", notice);
  };

  const leaveRoom = (socket: ChatSocket) => {
    socket.rooms.forEach((room) => {
      // 기본적으로 본인 이름의 방이 존재
      if (room === socket.id) return;
      console.log(`Socket ${socket.data.nickname} is leaving room ${room}.`);

      // 방 안에 혼자 있을 경우 방 제거
      if (getParticipantCount(room) <= 1) {
        console.log(`Remove room ${room}`);
        publicRooms = publicRooms.filter((value) => value.name != room);
      } else {
        const leaveRoom = getPublicRoom(room);
        if (!leaveRoom) return;

        leaveRoom.users = leaveRoom.users.filter(
          (u) => u.id !== socket.data.id
        );

        const notice: RoomNotice = {
          roomId: leaveRoom.id,
          type: NoticeType.USER_LEAVE,
          user: convertToUser(socket.data),
        };

        wsServer.to(room).emit("roomNotice", notice);
      }

      socket.leave(room);
    });
  };

  /**
   * Events
   */

  wsServer.on("connection", (socket) => {
    socket.onAny((event, ...args) =>
      console.log(
        `Socket event(${socket.id}): ${event} ${JSON.stringify(args)}`
      )
    );

    socket.on("login", (userInfo: UserInfo) => {
      console.log(userInfo);
      socket.data = userInfo;
    });

    socket.on("roomCreate", (name: string) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      // 방 생성 로직
      name = name.trim();
      if (getPublicRoom(name)) {
        socket.emit("error", "같은 이름의 방이 존재합니다.");
        return;
      }

      id += 1;
      const newRoom: PublicRoomInfo = {
        id,
        name: name.trim(),
        users: [],
      };

      publicRooms.push(newRoom);

      // 방 입장
      enterRoom(socket, name);

      // 공지
      notifyRoomList();
    });

    socket.on("roomEnter", (name: string) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      if (socket.rooms.size > 1) {
        console.log(`socket ${socket.id} is already in room. `, socket.rooms);
        socket.emit("error", "이미 다른 방에 참가중입니다.");
        return;
      }

      enterRoom(socket, name);

      // 사용자 수 변동 공지
      notifyRoomList();
    });

    socket.on("roomInfo", (id: number) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      const room = getPublicRoomById(id);
      if (room === undefined) {
        socket.emit("error", "존재하지 않는 방입니다.");
        return;
      }

      socket.emit("roomInfo", room);
    });

    socket.on("roomList", () => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      socket.emit("roomList", getPublicRoomList());
    });

    socket.on("roomLeave", () => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      leaveRoom(socket);
      socket.emit("roomLeave");
      notifyRoomList();
    });

    socket.on("roomChat", (request: RoomChatRequest) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      const room = getPublicRoom(request.roomName);
      if (room === undefined) {
        socket.emit("error", "존재하지 않는 방입니다.");
        return;
      }

      if (request.message.trim() === "") {
        socket.emit("error", "메시지는 비어있을 수 없습니다.");
        return;
      }

      const response: RoomChatResponse = {
        userId: socket.data.id ?? 0,
        message: request.message,
      };

      wsServer.in(room.name).emit("roomChat", response);
    });

    const getDirectRoomName = (id1: number, id2: number): string => {
      if (id1 < id2) return `${randomString}-${id1}-${id2}`;
      else return `${randomString}-${id2}-${id1}`;
    };

    socket.on("directEnter", (userId: number) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      if (socket.data.id === userId) {
        socket.emit("error", "자신과 대화를 나눌 수 없습니다.");
        return;
      }

      socket.join(getDirectRoomName(socket.data.id ?? 0, userId));
      socket.emit("directEnter", userId);
    });

    socket.on("directChat", (chat: DirectChatRequest) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      if (socket.data.id === chat.userId) {
        socket.emit("error", "자신과 대화를 나눌 수 없습니다.");
        return;
      }

      wsServer
        .in(getDirectRoomName(socket.data.id ?? 0, chat.userId))
        .emit("directChat", {
          userId: socket.data.id ?? 0,
          message: chat.message,
        });
    });

    socket.on("directLeave", (userId: number) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
        return;
      }

      if (socket.data.id === userId) {
        socket.emit("error", "자신과 대화를 나눌 수 없습니다.");
        return;
      }

      socket.leave(getDirectRoomName(socket.data.id ?? 0, userId));
      socket.emit("directLeave", userId);
    });

    socket.on("disconnecting", () => {
      leaveRoom(socket);
      notifyRoomList();
    });
  });
};

export default webSocketServer;
