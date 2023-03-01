import { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { publicRoomInfoStore } from "src/stores/usePublicRoomInfo";
import { directRoomInfoStore } from "src/stores/useDirectRoomInfo";
import { SocketContext } from "src/context/socketio";
import FriendPage from "./friends/FriendPage";
import Room from "./room/Room";
import RoomList from "./room/RoomList";
import LogoutPage from "./navigation/LogoutPage";
import Navigation from "./navigation/Navigation";
import UsersPage from "./users/UsersPage";
import DirectRoom from "./direct/DirectRoom";

const ProtectedRoutes: React.FC<{}> = () => {
  const socket = useContext(SocketContext);
  const { pathname } = useLocation();
  const { publicRoomInfo } = publicRoomInfoStore();
  const { directRoomInfo } = directRoomInfoStore();

  useEffect(() => {
    if (publicRoomInfo && !pathname.startsWith("/rooms")) {
      socket.emit("roomLeave");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicRoomInfo, pathname]);

  useEffect(() => {
    if (directRoomInfo && !pathname.startsWith("/direct")) {
      socket.emit("directLeave", directRoomInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directRoomInfo, pathname]);

  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full mt-16">
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="/direct/:userId" element={<DirectRoom />} />
          <Route path="/users/*" element={<UsersPage />} />
          <Route path="/friends/*" element={<FriendPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
