import { Server } from "socket.io";
import http from "http";
import {
  ClientEvent,
  InternalEvent,
  PublicRoomInfo,
  PublicRoomListInfo,
  ServerEvent,
  UserInfo,
} from "./socketConstants.js";

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
  const publicRooms: PublicRoomInfo[] = [];

  const validateUser = (
    userInfo: UserInfo | Partial<UserInfo> | undefined
  ): boolean => {
    return userInfo?.id === undefined;
  };

  const getPublicRoom = (name: string) =>
    publicRooms.find((r) => r.name === name);

  wsServer.on("connection", (socket) => {
    socket.onAny((event) =>
      console.log(`Socket event(${socket.data}): ${JSON.stringify(event)}`)
    );

    socket.on("login", (userInfo: UserInfo) => {
      console.log(userInfo);
      socket.data = userInfo;
    });

    socket.on("roomCreate", (name: string) => {
      if (!validateUser(socket.data)) {
        socket.emit("error", "인증되지 않은 사용자입니다.");
      }

      name = name.trim();
      if (getPublicRoom(name)) {
        socket.emit("error", "같은 이름의 방이 존재합니다.");
      }

      // Private room 제외
      if (socket.rooms.size > 1) {
        socket.emit("error", "이미 다른 방에 참가중입니다.");
      }

      id += 1;
      const newRoom: PublicRoomInfo = {
        id,
        name,
        users: [
          {
            id: socket.data.id ?? 0,
            name: socket.data.name ?? "",
            nickname: socket.data.nickname ?? "",
            createdAt: socket.data.createdAt ?? new Date(),
          },
        ],
      };

      publicRooms.push(newRoom);
      socket.emit("roomEnter", newRoom);

      const roomList: PublicRoomListInfo[] = publicRooms.map((p) => {
        return {
          id: p.id,
          name: p.name,
          participants: p.users.length,
        };
      });
      wsServer.sockets.emit("roomList", roomList);
    });

    socket.on("roomList", () => {
      const roomList: PublicRoomListInfo[] = publicRooms.map((p) => {
        return {
          id: p.id,
          name: p.name,
          participants: p.users.length,
        };
      });
      socket.emit("roomList", roomList);
    });
  });
};

export default webSocketServer;
