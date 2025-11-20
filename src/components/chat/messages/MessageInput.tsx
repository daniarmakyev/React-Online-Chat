import { useState, type FormEvent } from "react";
import Send from "../../../assets/Send.svg?react";

interface MessageInputProps {
	onSendMessage: (message: string) => void;
	isConnected: boolean;
}

const MessageInput = ({ onSendMessage, isConnected }: MessageInputProps) => {
	const [newMessage, setNewMessage] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (newMessage.trim()) {
			onSendMessage(newMessage.trim());
			setNewMessage("");
		}
	};

	return (
		<div className="border-t border-gray-200 bg-white p-4 shadow-lg">
			<form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
				<div className="flex gap-3">
					<div className="flex-1 relative">
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder="Type your message..."
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
							disabled={!isConnected}
						/>
					</div>
					<button
						type="submit"
						disabled={!isConnected || !newMessage.trim()}
						className="px-6 py-3 bg-linear-to-r bg-blue-600 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform flex items-center gap-2"
					>
						<Send />
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default MessageInput;
