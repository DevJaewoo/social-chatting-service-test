import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import SignupPage from "./login/SignupPage";

const UnauthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default UnauthorizedRoutes;
