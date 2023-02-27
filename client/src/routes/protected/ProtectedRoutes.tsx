import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./main/MainPage";
import Room from "./main/Room";
import Navigation from "./Navigation";

const ProtectedRoutes: React.FC<{}> = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full mt-16">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="/users" />
          <Route path="/friends" />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
