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
	
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && e.shiftKey) {
			e.preventDefault();
			const cursorPosition = e.currentTarget.selectionStart;
			const newMessage = message.substring(0, cursorPosition) + '\n' + message.substring(cursorPosition);
			setMessage(newMessage);
			
			// Set cursor position after the new line
			setTimeout(() => {
				const textarea = e.currentTarget;
				textarea.selectionStart = cursorPosition + 1;
				textarea.selectionEnd = cursorPosition + 1;
			}, 0);
		} else if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
		}
	};
	
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		let newText = e.target.value;
		
		// Auto-capitalize first letter of input
		if (newText.length === 1) {
			newText = newText.toUpperCase();
		}
		
		// Auto-capitalize first letter after period and space
		newText = newText.replace(/\.\s+[a-z]/g, (match) => {
			return match.toUpperCase();
		});
		
		setMessage(newText);
	};

	// Calculate rows based on content
	const calculateRows = () => {
		const lineCount = (message.match(/\n/g) || []).length + 1;
		return Math.min(Math.max(1, lineCount), 5); // Min 1 row, max 5 rows
	};

	return (
		<form className='px-6 py-4 bg-gray-800 bg-opacity-50' onSubmit={handleSubmit}>
			<div className='flex items-end gap-2'>
				<div className='relative flex-grow'>
					<textarea
						className='w-full px-4 py-3 bg-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
						placeholder='Type a message...'
						value={message}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						rows={calculateRows()}
						style={{ 
							overflowY: calculateRows() >= 5 ? 'auto' : 'hidden',
							scrollbarWidth: 'none', // Firefox
							msOverflowStyle: 'none' // IE/Edge
						}}
					/>
					{/* Hide scrollbar for Chrome/Safari/Opera */}
					<style jsx>{`
						textarea::-webkit-scrollbar {
							display: none;
						}
					`}</style>
				</div>
				<button
					type='submit'
					className='btn btn-circle bg-blue-600 hover:bg-blue-700 border-none flex-shrink-0 mb-1'
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