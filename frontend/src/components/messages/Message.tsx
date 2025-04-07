import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message?.senderId === authUser?.id;
	const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
	const chatClass = fromMe ? "chat-end" : "chat-start";
	const bubbleClass = fromMe ? "bg-blue-600" : "bg-gray-700";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClass} my-4`}>
			<div className='chat-image avatar'>
				<div className='w-8 rounded-full'>
					<img src={img} alt='user avatar' />
				</div>
			</div>
			<div className={`chat-bubble ${bubbleClass} ${shakeClass} shadow-lg`}>
				{message.body}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-300 mt-1'>
				{extractTime(message.createdAt)}
			</div>
		</div>
	);
};
export default Message;