import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FriendListItem, FriendListResponse } from "src/api/friendApi";
import FriendItem from "./_FriendItem";

const FriendList: React.FC<{}> = () => {
  const [friendList, setFriendList] = useState<FriendListItem[]>([]);

  useEffect(() => {
    const getFriendList = async () => {
      const response = await axios
        .get<FriendListResponse>("/api/friends")
        .catch((_) => {});

      if (!response) return;
      setFriendList(response.data.friendList);
    };

    getFriendList();
  }, []);

  const onDeleteClick = async (friend: FriendListItem) => {
    const response = await axios
      .delete(`/api/friends/${friend.id}`)
      .catch((_) => {});

    if (!response || response.status !== 204) return;
    setFriendList(friendList.filter((f) => f.id !== friend.id));
  };

  const onDirectClick = () => {};

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col justify-between w-full max-w-7xl mt-10">
        <div className="flex flex-row justify-evenly w-full">
          <Link
            to="/friends/requests"
            className="flex-1 p-2 border-b text-center"
          >
            받은 요청
          </Link>
          <Link
            to="/friends"
            className="flex-1 p-2 border-b-2 text-center font-bold"
          >
            친구 목록
          </Link>
        </div>
        <div className="flex flex-col items-center w-full min-h-full">
          {friendList &&
            friendList.map((user) => (
              <FriendItem
                key={user.id}
                friendListItem={user}
                onDeleteClick={onDeleteClick}
                onDirectClick={onDirectClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
