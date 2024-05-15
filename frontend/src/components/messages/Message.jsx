import { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { IoCloseOutline } from "react-icons/io5";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';

  const shakeClass = message.shouldShake ? "shake" : "";

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      {message.type === 'text' ? (
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-3`}>
          {message.message}
        </div>
      ) : (
        <div className={`chat-bubble ${shakeClass} pb-3`} style={{ backgroundColor: 'transparent', padding: 0 }}>
          <img
            src={`data:${message.mimeType};base64,${message.content}`}
            alt="Sent Image"
            style={{ maxWidth: '150px', maxHeight: '200px', borderRadius: '8px', cursor: 'pointer' }}
            onClick={toggleModal} 
          />
        </div>
      )}
      <div className="chat-footer opacity-30 text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex justify-center items-center">
            <button className="absolute top-4 right-4 text-white" onClick={toggleModal}><IoCloseOutline /></button>
            <img
              src={`data:${message.mimeType};base64,${message.content}`}
              alt="Sent Image"
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;











//old code reference.//
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({message}) => {
//   const {authUser} =  useAuthContext();
//   const {selectedConversation} = useConversation();
//   const fromMe = message.senderId === authUser._id;
//   const formattedTime = extractTime(message.createdAt);
//   const chatClassName = fromMe ? 'chat-end' : 'chat-start';
//   const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
//   const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';

//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//             <div className="chat-image avatar">
//             <div className="w-10 rounded-full " >
//                 <img alt="Bubble" src={profilePic} />
//             </div>
//         </div>
//         <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-3`}>{message.message}</div>
//         <div className="chat-footer opacity-30 text-xs flex gap-1 items-center text-white">{formattedTime}</div>
//     </div>
//   );
// };

// export default Message;