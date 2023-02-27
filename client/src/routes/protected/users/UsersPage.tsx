import axios from "axios";
import { useEffect, useState } from "react";
import { UserListItem, UserListResponse } from "src/api/userApi";
import { currentUserInfoStore } from "src/stores/useCurrentUserInfo";
import UserItem from "./_UserItem";

const UserPage: React.FC<{}> = () => {
  const { userInfo } = currentUserInfoStore();
  const [userList, setUserList] = useState<UserListItem[]>([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = await axios
      .get<UserListResponse>("/api/users")
      .catch((err) => console.log(err));

    if (!response) return;
    setUserList(
      response.data.userList.filter((user) => user.id !== userInfo?.id)
    );
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row justify-between w-full max-w-7xl min-h-[20rem] mt-10">
        <div className="flex flex-col items-center w-full min-h-full">
          {userList.map((user) => (
            <UserItem key={user.id} userListItem={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
