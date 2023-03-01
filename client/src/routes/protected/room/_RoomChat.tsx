export const ChatType = {
  CHAT_ME: "CHAT_ME",
  CHAT_USER: "CHAT_USER",
  CHAT_NOTICE: "CHAT_NOTICE",
};

export type TChatType = (typeof ChatType)[keyof typeof ChatType];

export interface Chat {
  type: TChatType;
  user?: string;
  message: string;
}

interface Props {
  chat: Chat;
}

const RoomChat: React.FC<Props> = ({ chat }) => {
  switch (chat.type) {
    case ChatType.CHAT_ME:
      return (
        <div className="flex flex-row justify-end items-center w-full h-10 my-3 cursor-pointer">
          <div className="flex justify-center items-center bg-yellow-400 p-3 rounded-lg shadow-lg">
            {chat.message}
          </div>
        </div>
      );
    case ChatType.CHAT_USER:
      return (
        <div className="flex flex-row justify-start items-center w-full h-10 my-3 cursor-pointer">
          <div className="flex justify-center items-center bg-gray-200 p-3 rounded-lg shadow-lg">
            {`${chat.user}: ${chat.message}`}
          </div>
        </div>
      );
    case ChatType.CHAT_NOTICE:
      return (
        <div className="flex flex-row justify-center items-center w-full h-10 my-3 cursor-pointer">
          <div className="flex justify-center items-center bg-gray-400 px-5 py-3 rounded-full shadow-lg">
            {chat.message}
          </div>
        </div>
      );
  }
  return (
    <div className="flex justify-center items-center w-full h-10 my-3 rounded-md shadow-lg cursor-pointer">
      {chat.message}
    </div>
  );
};

export default RoomChat;
