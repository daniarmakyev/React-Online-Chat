import type { IMessage } from "../../../types";

interface MessageItemProps {
	message: IMessage;
	isOwnMessage: boolean;
}

const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
	return (
		<div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-md rounded-2xl px-4 py-3 shadow-sm ${
					isOwnMessage
						? "bg-blue-600 text-white rounded-br-none"
						: "bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm"
				}`}
			>
				<div className="flex items-center gap-2 mb-1 justify-between">
					<span
						className={`font-semibold text-sm ${
							isOwnMessage ? "text-white" : "text-gray-700"
						}`}
					>
						{message.sender.username}
					</span>
					<div
						className={`text-xs ${
							isOwnMessage ? "text-blue-100" : "text-gray-500"
						}`}
					>
						{new Date(message.createdAt).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</div>
				</div>
				<div className="wrap-break-word">{message.text}</div>
			</div>
		</div>
	);
};

export default MessageItem;
