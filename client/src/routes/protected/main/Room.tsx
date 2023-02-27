import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { SocketContext } from "src/context/socketio";
import { PublicRoomInfo, RoomNotice } from "src/constants";
import { currentUserInfoStore } from "src/stores/useCurrentUserInfo";
import RoomUser from "./_RoomUser";
import RoomChat, { Chat, ChatType } from "./_RoomChat";

const Room: React.FC<{}> = () => {
  const { roomId } = useParams();
  const { userInfo } = currentUserInfoStore();

  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [chatting, setChatting] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [roomInfo, setRoomInfo] = useState<PublicRoomInfo>({
    id: 0,
    name: "",
    users: [],
  });

  const onUserEnter = (notice: RoomNotice) => {
    setRoomInfo((_roomInfo) => {
      if (_roomInfo.users.find((r) => r.id === notice.user.id))
        return _roomInfo;
      return {
        ..._roomInfo,
        users: [
          ..._roomInfo.users,
          {
            id: notice.user.id,
            name: notice.user.name,
            nickname: notice.user.nickname,
            createdAt: notice.user.createdAt,
          },
        ],
      };
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
    setRoomInfo((_roomInfo) => {
      return {
        ..._roomInfo,
        users: _roomInfo.users.filter((u) => u.id !== notice.user.id),
      };
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
    if (roomId === undefined) {
      navigate("/");
    }

    socket.on("roomInfo", (_roomInfo: PublicRoomInfo) => {
      setRoomInfo(_roomInfo);
    });

    socket.on("roomLeave", () => {
      navigate("/");
    });

    const NoticeEvent = {
      USER_ENTER: onUserEnter,
      USER_LEAVE: onUserLeave,
    };

    socket.on("roomNotice", (notice) => {
      NoticeEvent[notice.type](notice);
    });

    socket.on("roomChat", (chat) => {
      const newChat = {
        type:
          chat.userId === userInfo?.id ? ChatType.CHAT_ME : ChatType.CHAT_USER,
        user: roomInfo.users.find((u) => u.id === chat.userId)?.nickname ?? "",
        message: chat.message,
      };

      setChatList((_chatList) => [..._chatList, newChat]);
    });

    socket.emit("roomInfo", parseInt(roomId ?? "0", 10));

    // unmount 시 listener 해제
    return () => {
      socket.off("roomInfo");
      socket.off("roomLeave");
      socket.off("roomNotice");
      socket.off("roomChat");
    };
  }, [socket, navigate, roomId]);

  const onLeaveRoom = () => {
    socket.emit("roomLeave");
  };

  const onChatting: MouseEventHandler = (event) => {
    event.preventDefault();
    if (chatting.trim() === "") return;

    setChatting("");
    socket.emit("roomChat", {
      roomName: roomInfo.name,
      message: chatting,
    });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row justify-between w-full max-w-7xl min-h-[20rem] mt-10">
        <div className="flex flex-1 flex-col justify-between w-full min-h-full p-4 shadow-lg rounded-lg">
          <div className="flex flex-col">
            <h2 className="w-full pb-2 border-b">
              [번호: {roomInfo.id}] {roomInfo.name}
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
              현재 인원: {roomInfo.users.length}
            </h2>
            <div className="w-full mt-2">
              {roomInfo.users.map((_userInfo) => (
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
