import { Button } from "@mantine/core";
import { FriendListItem } from "src/api/friendApi";
import { getFormatedDate } from "src/utils/dateFormat";

interface Props {
  friendListItem: FriendListItem;
  onDeleteClick: (friendListItem: FriendListItem) => void;
  onDirectClick: (friendListItem: FriendListItem) => void;
}

const FriendItem: React.FC<Props> = ({
  friendListItem,
  onDeleteClick,
  onDirectClick,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-20 my-4 p-3 rounded-md shadow-lg">
      <div className="flex flex-row items-center">
        <p>{`${friendListItem.nickname}#${
          friendListItem.id
        } 가입일: ${getFormatedDate(friendListItem.createdAt)}`}</p>
      </div>
      <div>
        <Button
          className="bg-blue-600"
          size="lg"
          onClick={() => onDeleteClick(friendListItem)}
        >
          친구 삭제
        </Button>
        <Button
          className="ml-2 bg-blue-600"
          size="lg"
          onClick={() => onDirectClick(friendListItem)}
        >
          DM
        </Button>
      </div>
    </div>
  );
};

export default FriendItem;
