import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = (message) => {
    const { authUser } = useAuthContext();
    const {selectedConversation, setSelectedConversation} = useConversation();
    const fromMe = message.senderId === authUser._id;
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    

    useEffect(() => {
        //cleanup function (unmounts)
        return () => setSelectedConversation(null)
    },[setSelectedConversation]);
    
  return (
    <div className="md:min-w-[450px] flex flex-col">
        {!selectedConversation ? ( 
        <NoChatSelected />
        ) : (
                    <>
                    {/* Header */}
                    <div className="bg-slate-500 bg-opacity-50 px-4 py-2 mb-2">
                        <div className="chat-image avatar" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img alt="Profile" src={profilePic} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-white font-bold" style={{ marginLeft: '8px' }}>
                            {selectedConversation.fullName}
                            </span>
                        </div>
                    </div>

                    <Messages />
                    <MessageInput />
                    </>
        )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
    const {authUser} = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3l md:text-6xl text-center" />
            </div>
        </div>
    )
}