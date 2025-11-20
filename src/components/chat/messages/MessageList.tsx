import NoMessage from "../../../assets/NoMessage.svg?react";
import type { IMessage } from "../../../types";
import MessageItem from "./MessageItem";

interface MessageListProps {
	messages: IMessage[];
	currentUserId: string | null;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
	if (messages.length === 0) {
		return (
			<div className="text-center text-gray-500 mt-8">
				<NoMessage />
				<p className="mt-4 text-lg">No messages yet</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{messages.map((message, index) => (
				<MessageItem
					key={message._id || index}
					message={message}
					isOwnMessage={message.sender._id === currentUserId}
				/>
			))}
		</div>
	);
};

export default MessageList;
