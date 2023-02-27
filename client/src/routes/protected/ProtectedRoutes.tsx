import { Navigate, Route, Routes } from "react-router-dom";
import FriendPage from "./friends/FriendPage";
import MainPage from "./main/MainPage";
import Room from "./main/Room";
import Navigation from "./Navigation";
import UsersPage from "./users/UsersPage";

const ProtectedRoutes: React.FC<{}> = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full mt-16">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rooms/*" element={<Room />} />
          <Route path="/users/*" element={<UsersPage />} />
          <Route path="/friends/*" element={<FriendPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
