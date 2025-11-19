import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { getChannelMessages } from "../../store/action/channel.action";
import type { IMessage } from "../../types";
import { socketService } from "../../context/socket.service";
import { useSocket } from "../../context/soket";
import ChannelMembers from "./ChannelMembers";

const ChatWindow = () => {
	const dispatch = useAppDispatch();
	const { id, channelName } = useParams();
	const { channelMessages } = useAppSelector((state) => state.channel);
	const { isConnected } = useSocket();
	const idUser = localStorage.getItem("id");
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navigate = useNavigate();
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
		messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
	}, [messages]);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();

		if (!newMessage.trim() || !id || !isConnected) return;

		socketService.sendMessage(id, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="p-2 bg-gray-100 border-b flex justify-between">
				<button
					className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg"
					onClick={() => {
						navigate("/channels");
					}}
				>
					Menu
				</button>
				<h2 className="font-semibold text-2xl">{channelName && channelName}</h2>
				<button
					className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					Members
				</button>
			</div>

			<div className="flex-1 overflow-y-auto flex mb-3">
				<ul
					className={`flex flex-col gap-y-1 p-5  justify-between w-full ${
						isOpen && "w-[80%] mr-[20%]"
					}`}
				>
					{messages.map((message, index) => {
						const isOwnMessage = message.sender._id === idUser;
						return (
							<li
								key={message._id || index}
								className={`max-w-[400px] w-fit p-2 rounded-xl text-white ${
									isOwnMessage ? "bg-blue-500 self-end" : "bg-gray-500"
								}`}
							>
								<section className="text-[12px] flex gap-2">
									<h6 className="font-bold">{message.sender.username}</h6>
									<span className="font-light">
										{new Date(message.createdAt).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</section>
								<span>{message.text}</span>
							</li>
						);
					})}
					<div ref={messagesEndRef} />
				</ul>
				{isOpen && <ChannelMembers id={id!} />}
			</div>

			<div className="p-4 border-t bg-white">
				<form onSubmit={handleSendMessage} className="flex gap-2">
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Type a message..."
						className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={!isConnected}
					/>
					<button
						type="submit"
						disabled={!isConnected || !newMessage.trim()}
						className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatWindow;
