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
  return (
    <div className="flex justify-center items-center w-full h-10 my-3 rounded-md shadow-lg cursor-pointer">
      {chat.message}
    </div>
  );
};

export default RoomChat;
