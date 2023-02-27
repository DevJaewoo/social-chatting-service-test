import { UserInfo } from "src/stores/useCurrentUserInfo";

interface Props {
  userInfo: UserInfo;
}

const RoomUser: React.FC<Props> = ({ userInfo }) => {
  return (
    <div className="flex justify-center items-center w-full h-10 my-3 rounded-md shadow-lg cursor-pointer">
      {userInfo.nickname}
    </div>
  );
};

export default RoomUser;
