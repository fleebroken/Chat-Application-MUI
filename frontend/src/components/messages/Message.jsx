import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {
  const {authUser} =  useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
            <div className="w-10 rounded-full " >
                <img alt="Bubble" src={profilePic} />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-3`}>{message.message}</div>
        <div className="chat-footer opacity-30 text-xs flex gap-1 items-center text-white">{formattedTime}</div>
    </div>
  );
};

export default Message;