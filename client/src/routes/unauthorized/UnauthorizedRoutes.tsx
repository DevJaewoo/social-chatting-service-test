import { Navigate, Route, Routes } from "react-router-dom";

const UnauthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" />
      <Route path="/signup" />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default UnauthorizedRoutes;
