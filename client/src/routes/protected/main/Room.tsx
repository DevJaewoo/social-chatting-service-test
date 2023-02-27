import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "src/context/socketio";
import { PublicRoomInfo } from "src/constants";
import { Button, TextInput } from "@mantine/core";

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

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row justify-between w-full max-w-7xl min-h-[20rem] mt-10">
        <div className="flex flex-1 flex-col justify-between w-full min-h-full">
          <div className="flex flex-col">
            <h2 className="w-full">방 번호: {roomInfo.id}</h2>
            <div className="w-full mt-4">map</div>
          </div>
          <div className="flex flex-row items-center w-full h-10">
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
        <div className="flex flex-col justify-between items-center min-h-full w-40 ml-10">
          <div className="flex flex-col w-full">
            <h2 className="w-full">현재 인원: {roomInfo.users.length}</h2>
            <div className="w-full">map</div>
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
