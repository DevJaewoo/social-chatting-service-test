import { Route, Routes } from "react-router-dom";
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";

const FriendPage: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<FriendList />} />
      <Route path="/requests" element={<FriendRequests />} />
    </Routes>
  );
};

export default FriendPage;
