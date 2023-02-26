import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./main/MainPage";
import Navigation from "./Navigation";

const ProtectedRoutes: React.FC<{}> = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full mt-16">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
