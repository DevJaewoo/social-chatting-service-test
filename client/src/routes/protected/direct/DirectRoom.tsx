import { TextInput, Button } from "@mantine/core";
import axios from "axios";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomChat, { Chat, ChatType } from "src/components/RoomChat";
import { SocketContext } from "src/context/socketio";
import { currentUserInfoStore, UserInfo } from "src/stores/useCurrentUserInfo";
import { directRoomInfoStore } from "src/stores/useDirectRoomInfo";

const DirectRoom = () => {
  const { userId } = useParams();
  const { userInfo } = currentUserInfoStore();
  const { directRoomInfo, updateDirectRoomInfo, clearDirectRoomInfo } =
    directRoomInfoStore();

  const [friendInfo, setFriendInfo] = useState<UserInfo>({
    id: 0,
    name: "",
    nickname: "",
    createdAt: new Date(),
  });

  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [chatting, setChatting] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    const getFriendInfo = async () => {
      const response = await axios
        .get<UserInfo>(`/api/users/${userId}`)
        .catch(() => {});

      if (!response) return;
      setFriendInfo(response.data);
      updateDirectRoomInfo(response.data.id);
    };

    getFriendInfo();
  }, [userId, updateDirectRoomInfo]);

  useEffect(() => {
    socket.on("directChat", (chat) => {
      const newChat = {
        type:
          chat.userId === userInfo?.id ? ChatType.CHAT_ME : ChatType.CHAT_USER,
        user: friendInfo.nickname,
        message: chat.message,
      };

      setChatList((_chatList) => [..._chatList, newChat]);
    });

    return () => {
      socket.off("directChat");
    };
  });

  useEffect(() => {
    socket.on("directLeave", (_) => {
      clearDirectRoomInfo();
      navigate("/friends");
    });
  });

  const onLeaveRoom = () => {
    socket.emit("directLeave", directRoomInfo ?? 0);
  };

  const onChatting: MouseEventHandler = (event) => {
    event.preventDefault();
    if (chatting.trim() === "") return;

    setChatting("");
    socket.emit("directChat", {
      userId: parseInt(userId ?? "0", 10),
      message: chatting,
    });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row justify-between w-full max-w-7xl min-h-[20rem] mt-10">
        <div className="flex flex-col justify-between w-full min-h-full p-4 shadow-lg rounded-lg">
          <div className="flex flex-col">
            <h2 className="w-full pb-2 border-b text-center text-2xl">
              {friendInfo.nickname}
            </h2>
            <div className="w-full mt-4">
              {chatList.map((chat, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <RoomChat key={index} chat={chat} />
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-10 mt-4 mb-2">
            <form className="flex flex-1 flex-row items-center w-full h-10">
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
            <Button
              type="submit"
              className="bg-blue-600 ml-2"
              size="xl"
              onClick={onLeaveRoom}
            >
              나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectRoom;
