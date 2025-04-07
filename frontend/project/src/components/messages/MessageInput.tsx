import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-6 py-4 bg-gray-800 bg-opacity-50' onSubmit={handleSubmit}>
			<div className='relative'>
				<input
					type='text'
					className='w-full px-4 py-3 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Type a message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type='submit'
					className='absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle bg-blue-600 hover:bg-blue-700 border-none'
					disabled={loading}
				>
					{loading ? (
						<span className='loading loading-spinner loading-sm'></span>
					) : (
						<Send className='w-5 h-5 text-white' />
					)}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;