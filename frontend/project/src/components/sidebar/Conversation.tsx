import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji }: { conversation: ConversationType; emoji: string }) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
	const isSelected = selectedConversation?.id === conversation.id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation.id);

	return (
		<div
			className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-200 ease-in-out
				${isSelected ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
			onClick={() => setSelectedConversation(conversation)}
		>
			<div className='relative'>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 h-12 rounded-full'>
						<img 
							src={conversation.profilePic} 
							alt='avatar'
							className='rounded-full object-cover'
						/>
					</div>
				</div>
			</div>

			<div className='flex-1 flex flex-col'>
				<div className='flex justify-between items-center'>
					<p className='font-semibold text-gray-200'>{conversation.fullName}</p>
					<span className='text-xl'>{emoji}</span>
				</div>
			</div>
		</div>
	);
};
export default Conversation;