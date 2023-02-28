import { Navigate, Route, Routes } from "react-router-dom";
import FriendPage from "./friends/FriendPage";
import MainPage from "./main/MainPage";
import LogoutPage from "./navigation/LogoutPage";
import Navigation from "./navigation/Navigation";
import UsersPage from "./users/UsersPage";

const ProtectedRoutes: React.FC<{}> = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full mt-16">
        <Routes>
          <Route path="/*" element={<MainPage />} />
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
