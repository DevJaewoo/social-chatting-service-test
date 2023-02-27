import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "src/context/socketio";
import {
  NoticeType,
  PublicRoomInfo,
  RoomNotice,
  TNoticeType,
} from "src/constants";
import { Button, TextInput } from "@mantine/core";
import RoomUser from "./_RoomUser";

const Room: React.FC<{}> = () => {
  const { roomId } = useParams();

  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [chatting, setChatting] = useState<string>("");
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
  };

  const onUserLeave = (notice: RoomNotice) => {
    setRoomInfo((_roomInfo) => {
      return {
        ..._roomInfo,
        users: _roomInfo.users.filter((u) => u.id !== notice.user.id),
      };
    });
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

    socket.emit("roomInfo", parseInt(roomId ?? "0", 10));

    // unmount 시 listener 해제
    return () => {
      socket.off("roomInfo");
      socket.off("roomLeave");
    };
  }, [socket, navigate, roomId]);

  const onLeaveRoom = () => {
    socket.emit("roomLeave");
  };

  console.dir(roomInfo);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row justify-between w-full max-w-7xl min-h-[20rem] mt-10">
        <div className="flex flex-1 flex-col justify-between w-full min-h-full p-4 shadow-lg rounded-lg">
          <div className="flex flex-col">
            <h2 className="w-full pb-2 border-b">
              [번호: {roomInfo.id}] {roomInfo.name}
            </h2>
            <div className="w-full mt-4">map</div>
          </div>
          <div className="flex flex-row items-center w-full h-10 mb-2">
            <TextInput
              className="flex-1"
              placeholder="채팅 내용을 입력해주세요"
              value={chatting}
              onChange={(event) => setChatting(event.currentTarget.value)}
              size="xl"
            />
            <Button className="bg-blue-600 ml-4" size="xl">
              전송
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center min-h-full w-60 ml-10 p-4 shadow-lg rounded-lg">
          <div className="flex flex-col w-full">
            <h2 className="w-full pb-2 border-b">
              현재 인원: {roomInfo.users.length}
            </h2>
            <div className="w-full mt-2">
              {roomInfo.users.map((userInfo) => (
                <RoomUser key={userInfo.id} userInfo={userInfo} />
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
