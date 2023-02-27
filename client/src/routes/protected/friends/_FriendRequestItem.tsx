import { Button } from "@mantine/core";
import { AddRequestListItem } from "src/api/friendApi";
import { getFormatedDate } from "src/utils/dateFormat";

interface Props {
  requestListItem: AddRequestListItem;
  onAcceptClick: (requestListItem: AddRequestListItem) => void;
  onRejectClick: (requestListItem: AddRequestListItem) => void;
}

const FriendRequestItem: React.FC<Props> = ({
  requestListItem,
  onAcceptClick,
  onRejectClick,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-20 my-4 p-3 rounded-md shadow-lg">
      <div className="flex flex-row items-center">
        <p>{`${requestListItem.nickname}#${
          requestListItem.id
        } 가입일: ${getFormatedDate(requestListItem.createdAt)}`}</p>
      </div>
      <div>
        <Button
          className="bg-blue-600"
          size="lg"
          onClick={() => onAcceptClick(requestListItem)}
        >
          수락
        </Button>
        <Button
          className="ml-2 bg-blue-600"
          size="lg"
          onClick={() => onRejectClick(requestListItem)}
        >
          거절
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
