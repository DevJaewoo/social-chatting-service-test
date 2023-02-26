import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default ProtectedRoutes;
