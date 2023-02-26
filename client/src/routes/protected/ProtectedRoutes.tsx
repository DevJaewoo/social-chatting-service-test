import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";

const ProtectedRoutes: React.FC<{}> = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full mt-16">
        <Routes>
          <Route path="/" />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
