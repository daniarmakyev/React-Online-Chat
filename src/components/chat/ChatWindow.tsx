import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { getChannelMessages } from "../../store/action/channel.action";
import type { IMessage } from "../../types";
import { socketService } from "../../context/socket.service";
import { useSocket } from "../../context/soket";
import ChatHeader from "../channels/ChatHeader";
import MessageList from "./messages/MessageList";
import MessageInput from "./messages/MessageInput";
import MembersSidebar from "./MembersSidebar";

const ChatWindow = () => {
	const dispatch = useAppDispatch();
	const { id, channelName } = useParams();
	const { channelMessages } = useAppSelector((state) => state.channel);
	const { isConnected } = useSocket();
	const idUser = localStorage.getItem("id");
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMessages(channelMessages);
	}, [channelMessages]);

	useEffect(() => {
		if (!id || !isConnected) return;

		dispatch(getChannelMessages(id));
		socketService.joinChannel(id);

		const handleNewMessage = (data: { message: IMessage }) => {
			setMessages((prev) => [...prev, data.message]);
		};

		const handleJoinedChannel = (data: { channelId: string }) => {
			console.log("Successfully joined channel:", data.channelId);
		};

		socketService.onNewMessage(handleNewMessage);
		socketService.onJoinedChannel(handleJoinedChannel);

		return () => {
			socketService.leaveChannel(id);
			socketService.removeListener("new_message");
			socketService.removeListener("joined_channel");
		};
	}, [id, dispatch, isConnected]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = (message: string) => {
		if (!id || !isConnected) return;
		socketService.sendMessage(id, message);
	};

	const handleMembersToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex flex-col h-screen bg-gray-50">
			<ChatHeader
				channelName={channelName}
				isConnected={isConnected}
				onMembersToggle={handleMembersToggle}
			/>

			<div className="flex-1 flex overflow-hidden">
				<div className="flex-1 flex flex-col transition-all duration-300">
					<div className="flex-1 overflow-y-auto px-4 py-6">
						<div className="mx-auto">
							<MessageList messages={messages} currentUserId={idUser} />
						</div>
						<div ref={messagesEndRef} />
					</div>

					<MessageInput
						onSendMessage={handleSendMessage}
						isConnected={isConnected}
					/>
				</div>

				<MembersSidebar isOpen={isOpen} channelId={id!} />
			</div>
		</div>
	);
};

export default ChatWindow;
