import { useParams } from "react-router-dom";

const Room: React.FC<{}> = () => {
  const { roomId } = useParams();
  return <div>{roomId}</div>;
};

export default Room;
