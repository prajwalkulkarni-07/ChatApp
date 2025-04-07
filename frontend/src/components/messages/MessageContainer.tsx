import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { MessageCircle } from "lucide-react";

const MessageContainer = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className='flex flex-col flex-1 bg-gray-900 bg-opacity-50'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<div className='bg-gray-800 px-6 py-4 flex items-center gap-3'>
						<div className='avatar'>
							<div className='w-10 rounded-full'>
								<img src={selectedConversation.profilePic} alt='user avatar' />
							</div>
						</div>
						<div>
							<p className='font-bold text-gray-200'>{selectedConversation.fullName}</p>
							<p className='text-sm text-gray-400'>Online</p>
						</div>
					</div>

					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50'>
			<div className='px-4 text-center text-gray-200 flex flex-col items-center gap-4'>
				<p className='text-2xl font-bold'>Welcome, {authUser?.fullName} 👋</p>
				<p className='text-lg'>Select a chat to start messaging</p>
				<MessageCircle className='w-16 h-16 text-gray-400' />
			</div>
		</div>
	);
};

export default MessageContainer;