import { Button } from "@mantine/core";
import { UserListItem } from "src/api/userApi";
import { FollowStatus, FriendStatus } from "src/constants";
import { getFormatedDate } from "src/utils/dateFormat";

interface Props {
  userListItem: UserListItem;
}

const FollowText = {
  REQUESTED: "요청 완료",
  FOLLOWED: "팔로잉",
  REJECTED: "요청 완료",
  BLOCKED: "요청 완료",
  NONE: "팔로우",
} as const;

const FriendText = {
  ACCEPTED: "친구 상태", // 수락
  BLOCKED: "요청 완료", // 차단
  REQUESTED: "요청 완료", // 요청
  REJECTED: "요청 완료", // 거절
  NONE: "친구 요청",
} as const;

const UserItem: React.FC<Props> = ({ userListItem }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-20 my-4 p-3 rounded-md shadow-lg">
      <div className="flex flex-row items-center">
        <p>{`${userListItem.nickname}#${
          userListItem.id
        } 가입일: ${getFormatedDate(userListItem.createdAt)}`}</p>
      </div>
      <div>
        <Button
          className={`${
            userListItem.followStatus === FollowStatus.NONE
              ? "bg-blue-600"
              : "bg-gray-400"
          }`}
          size="lg"
        >
          {FollowText[userListItem.followStatus]}
        </Button>
        <Button
          className={`ml-2 ${
            userListItem.friendStatus === FriendStatus.NONE
              ? "bg-blue-600"
              : "bg-gray-400"
          }`}
          size="lg"
        >
          {FriendText[userListItem.friendStatus]}
        </Button>
      </div>
    </div>
  );
};

export default UserItem;
