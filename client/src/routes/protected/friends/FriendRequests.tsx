import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AddRequestListItem, AddRequestListResponse } from "src/api/friendApi";
import FriendRequestItem from "./_FriendRequestItem";

const FriendRequests: React.FC<{}> = () => {
  const [requestList, setRequestList] = useState<AddRequestListItem[]>([]);

  useEffect(() => {
    const getAddRequestList = async () => {
      const response = await axios
        .get<AddRequestListResponse>("/api/friends/requests")
        .catch((_) => {});

      if (!response) return;
      setRequestList(response.data.addRequestList);
    };

    getAddRequestList();
  }, []);

  const onAcceptClick = async (addRequest: AddRequestListItem) => {
    const response = await axios
      .put(`/api/friends/requests/${addRequest.id}`)
      .catch((_) => {});

    if (!response || response.status !== 204) return;
    setRequestList(requestList.filter((f) => f.id !== addRequest.id));
  };

  const onDeclineClick = () => {};

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col justify-between w-full max-w-7xl mt-10">
        <div className="flex flex-row justify-evenly w-full">
          <Link
            to="/friends/requests"
            className="flex-1 p-2 border-b-2 text-center font-bold"
          >
            받은 요청
          </Link>
          <Link to="/friends" className="flex-1 p-2 border-b text-center">
            친구 목록
          </Link>
        </div>
        <div className="flex flex-col items-center w-full min-h-full">
          {requestList &&
            requestList.map((user) => (
              <FriendRequestItem
                key={user.id}
                requestListItem={user}
                onAcceptClick={onAcceptClick}
                onRejectClick={onDeclineClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
