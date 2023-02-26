import { Route, Routes } from "react-router-dom";
import RoomList from "./RoomList";

const MainPage: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RoomList />} />
    </Routes>
  );
};

export default MainPage;
