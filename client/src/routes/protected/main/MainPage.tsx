import { Route, Routes } from "react-router-dom";
import Room from "./Room";
import RoomList from "./RoomList";

const MainPage: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/rooms/:roomId" element={<Room />} />
      <Route path="*" element={<RoomList />} />
    </Routes>
  );
};

export default MainPage;
