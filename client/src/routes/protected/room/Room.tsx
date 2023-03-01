import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { SocketContext } from "src/context/socketio";
import { PublicRoomInfo, RoomNotice } from "src/socketConstants";
import { currentUserInfoStore } from "src/stores/useCurrentUserInfo";
import { publicRoomInfoStore } from "src/stores/usePublicRoomInfo";
import RoomChat, { Chat, ChatType } from "src/components/RoomChat";
import RoomUser from "./_RoomUser";

const Room: React.FC<{}> = () => {
  const { roomId } = useParams();
  const { userInfo } = currentUserInfoStore();
  const { publicRoomInfo, updatePublicRoomInfo, clearPublicRoomInfo } =
    publicRoomInfoStore();

  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [chatting, setChatting] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>([]);

  const onUserEnter = (notice: RoomNotice) => {
    if (
      !publicRoomInfo ||
      publicRoomInfo.users.find((r) => r.id === notice.user.id)
    )
      return;

    updatePublicRoomInfo({
      ...publicRoomInfo,
      users: [
        ...publicRoomInfo.users,
        {
          id: notice.user.id,
          name: notice.user.name,
          nickname: notice.user.nickname,
          createdAt: notice.user.createdAt,
        },
      ],
    });

    setChatList((_chatList) => [
      ..._chatList,
      {
        type: ChatType.CHAT_NOTICE,
        message: `${notice.user.nickname}님이 입장하셨습니다.`,
      },
    ]);
  };

  const onUserLeave = (notice: RoomNotice) => {
    if (!publicRoomInfo) return;

    updatePublicRoomInfo({
      ...publicRoomInfo,
      users: publicRoomInfo.users.filter((u) => u.id !== notice.user.id),
    });

    setChatList((_chatList) => [
      ..._chatList,
      {
        type: ChatType.CHAT_NOTICE,
        message: `${notice.user.nickname}님이 퇴장하셨습니다.`,
      },
    ]);
  };

  useEffect(() => {
    socket.on("roomInfo", (_roomInfo: PublicRoomInfo) => {
      updatePublicRoomInfo(_roomInfo);
    });

    socket.emit("roomInfo", parseInt(roomId ?? "0", 10));

    return () => {
      socket.off("roomInfo");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    const NoticeEvent = {
      USER_ENTER: onUserEnter,
      USER_LEAVE: onUserLeave,
    };

    socket.on("roomNotice", (notice) => {
      NoticeEvent[notice.type](notice);
    });

    return () => {
      socket.off("roomNotice");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("roomChat", (chat) => {
      const newChat = {
        type:
          chat.userId === userInfo?.id ? ChatType.CHAT_ME : ChatType.CHAT_USER,
        user:
          publicRoomInfo?.users.find((u) => u.id === chat.userId)?.nickname ??
          "",
        message: chat.message,
      };

      setChatList((_chatList) => [..._chatList, newChat]);
    });

    // unmount 시 listener 해제
    return () => {
      socket.off("roomChat");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, publicRoomInfo, userInfo]);

  useEffect(() => {
    socket.on("roomLeave", () => {
      clearPublicRoomInfo();
      navigate("/");
    });

    // unmount 시 listener 해제
    return () => {
      socket.off("roomLeave");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const onLeaveRoom = () => {
    socket.emit("roomLeave");
  };

  const onChatting: MouseEventHandler = (event) => {
    event.preventDefault();
    if (chatting.trim() === "") return;

    setChatting("");
    socket.emit("roomChat", {
      roomName: publicRoomInfo?.name ?? "",
      message: chatting,
    });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row justify-between w-full max-w-7xl min-h-[20rem] mt-10">
        <div className="flex flex-1 flex-col justify-between w-full min-h-full p-4 shadow-lg rounded-lg">
          <div className="flex flex-col">
            <h2 className="w-full pb-2 border-b">
              [번호: {publicRoomInfo?.id}] {publicRoomInfo?.name}
            </h2>
            <div className="w-full mt-4">
              {chatList.map((chat, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <RoomChat key={index} chat={chat} />
              ))}
            </div>
          </div>
          <form className="flex flex-row items-center w-full h-10 mt-4 mb-2">
            <TextInput
              className="flex-1"
              placeholder="채팅 내용을 입력해주세요"
              value={chatting}
              onChange={(event) => setChatting(event.currentTarget.value)}
              size="xl"
            />
            <Button
              type="submit"
              className="bg-blue-600 ml-4"
              size="xl"
              onClick={onChatting}
            >
              전송
            </Button>
          </form>
        </div>
        <div className="flex flex-col justify-between items-center min-h-full w-60 ml-10 p-4 shadow-lg rounded-lg">
          <div className="flex flex-col w-full">
            <h2 className="w-full pb-2 border-b">
              현재 인원: {publicRoomInfo?.users.length ?? 0}
            </h2>
            <div className="w-full mt-2">
              {publicRoomInfo?.users.map((_userInfo) => (
                <RoomUser key={_userInfo.id} userInfo={_userInfo} />
              ))}
            </div>
          </div>
          <Button
            className="w-full bg-blue-600"
            onClick={onLeaveRoom}
            size="xl"
          >
            나가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Room;
