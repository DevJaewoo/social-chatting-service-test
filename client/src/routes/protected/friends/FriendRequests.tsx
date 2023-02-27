import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AcceptFriendResponse,
  AddRequestListItem,
  AddRequestListResponse,
} from "src/api/friendApi";
import { FriendStatus, TFriendStatus } from "src/constants";
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

  const onAccept = async (
    addRequest: AddRequestListItem,
    status: TFriendStatus
  ) => {
    const response = await axios
      .patch<AcceptFriendResponse>(`/api/friends/requests/${addRequest.id}`, {
        status,
      })
      .catch((_) => {});

    if (!response) return;
    setRequestList(requestList.filter((r) => r.id !== addRequest.id));
  };

  const onAcceptClick = (addRequest: AddRequestListItem) => {
    onAccept(addRequest, FriendStatus.ACCEPTED);
  };

  const onRejectClick = (addRequest: AddRequestListItem) => {
    onAccept(addRequest, FriendStatus.REJECTED);
  };

  const onBlockClick = (addRequest: AddRequestListItem) => {
    onAccept(addRequest, FriendStatus.BLOCKED);
  };

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
            requestList.map((request) => (
              <FriendRequestItem
                key={request.id}
                requestListItem={request}
                onAcceptClick={onAcceptClick}
                onRejectClick={onRejectClick}
                onBlockClick={onBlockClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
