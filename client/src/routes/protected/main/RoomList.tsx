import { Button, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicRoomInfo, PublicRoomListInfo } from "src/constants";
import { SocketContext } from "src/context/socketio";

interface Props {
  roomInfo: PublicRoomListInfo;
  onRoomEnter: (roomName: string) => void;
}

const RoomListItem: React.FC<Props> = ({ roomInfo, onRoomEnter }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-24 my-2 p-4 shadow-lg rounded-xl">
      <p className="flex-1 text-lg">{`${roomInfo.id}. ${roomInfo.name}`}</p>
      <Button
        className="ml-4 bg-blue-600"
        size="xl"
        onClick={() => onRoomEnter(roomInfo.name)}
      >
        참가
      </Button>
    </div>
  );
};

const RoomList: React.FC<{}> = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState<string>("");
  const [roomList, setRoomList] = useState<PublicRoomListInfo[]>([]);

  useEffect(() => {
    socket.on("roomList", (_roomList: PublicRoomListInfo[]) => {
      setRoomList(_roomList);
    });

    socket.on("roomEnter", (_roomInfo: PublicRoomInfo) => {
      console.log(_roomInfo);
      navigate(`/rooms/${_roomInfo.id}`);
    });

    socket.emit("roomList");

    // unmount 시 listener 해제
    return () => {
      socket.off("roomList");
      socket.off("roomEnter");
    };
  }, [socket, navigate]);

  const onRoomCreate = (_roomName: string) => {
    socket.emit("roomCreate", _roomName);
  };

  const onRoomEnter = (_roomName: string) => {
    socket.emit("roomEnter", _roomName);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col w-full max-w-7xl mt-10">
        <h2 className="ml-2 text-2xl">방 만들기</h2>
        <div className="flex flex-row justify-between items-center mt-4">
          <TextInput
            className="flex-1"
            placeholder="방 이름"
            size="xl"
            value={roomName}
            onChange={(event) => setRoomName(event.currentTarget.value)}
          />
          <Button
            className="ml-4 bg-blue-600"
            size="xl"
            onClick={() => onRoomCreate(roomName)}
          >
            방 만들기
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-7xl mt-10">
        <h2 className="ml-2 text-2xl">방 목록</h2>
        {roomList.map((room) => {
          return (
            <RoomListItem
              key={room.id}
              roomInfo={room}
              onRoomEnter={onRoomEnter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoomList;
