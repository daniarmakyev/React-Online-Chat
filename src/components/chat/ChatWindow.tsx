import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { getChannelMessages } from "../../store/action/channel.action";
import type { IMessage } from "../../types";
import { socketService } from "../../context/socket.service";
import { useSocket } from "../../context/soket";
import ChannelMembers from "./ChannelMembers";
import NoMessage from "../../assets/NoMessage.svg?react";
import Members from "../../assets/Members.svg?react";
import Send from "../../assets/Send.svg?react";
import Back from "../../assets/Back.svg?react";

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
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();

		if (!newMessage.trim() || !id || !isConnected) return;

		socketService.sendMessage(id, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className="flex flex-col h-screen bg-gray-50">
			<div className="p-4 bg-white border-b border-gray-200 shadow-sm">
				<div className="flex items-center justify-between max-w-6xl mx-auto">
					<button
						className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
						onClick={() => navigate("/channels")}
					>
						<Back />
						Back to Menu
					</button>

					<div className="text-center">
						<h2 className="font-bold text-xl text-gray-800">{channelName}</h2>
						<div className="flex items-center gap-2 mt-1 justify-center">
							<div
								className={`w-2 h-2 rounded-full ${
									isConnected ? "bg-green-500" : "bg-red-500"
								}`}
							></div>
							<span className="text-sm text-gray-600">
								{isConnected ? "Connected" : "Disconnected"}
							</span>
						</div>
					</div>

					<button
						className="flex items-center gap-2 px-4 py-2 text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
						onClick={() => setIsOpen(!isOpen)}
					>
						<Members />
						Members
					</button>
				</div>
			</div>

			<div className="flex-1 flex overflow-hidden">
				<div className={`flex-1 flex flex-col transition-all duration-300`}>
					<div className="flex-1 overflow-y-auto px-4 py-6">
						<div className=" mx-auto">
							{messages.length === 0 ? (
								<div className="text-center text-gray-500 mt-8">
									<NoMessage />
									<p className="mt-4 text-lg">No messages yet</p>
								</div>
							) : (
								<div className="space-y-4">
									{messages.map((message, index) => {
										const isOwnMessage = message.sender._id === idUser;
										return (
											<div
												key={message._id || index}
												className={`flex ${
													isOwnMessage ? "justify-end" : "justify-start"
												}`}
											>
												<div
													className={`max-w-md rounded-2xl px-4 py-3 shadow-sm ${
														isOwnMessage
															? "  bg-blue-600 text-white rounded-br-none"
															: "bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm"
													}`}
												>
													{
														<div className="flex items-center gap-2 mb-1 justify-between">
															<span
																className={`font-semibold text-sm text-gray-700 ${
																	isOwnMessage &&
																	"  bg-blue-600 text-white rounded-br-none"
																}`}
															>
																{message.sender.username}
															</span>
															<div
																className={`text-xs  ${
																	isOwnMessage
																		? "text-blue-100"
																		: "text-gray-500"
																}`}
															>
																{new Date(message.createdAt).toLocaleTimeString(
																	[],
																	{
																		hour: "2-digit",
																		minute: "2-digit",
																	},
																)}
															</div>
														</div>
													}
													<div className="wrap-break-word">{message.text}</div>
												</div>
											</div>
										);
									})}
									<div ref={messagesEndRef} />
								</div>
							)}
						</div>
					</div>

					<div className="border-t border-gray-200 bg-white p-4 shadow-lg">
						<form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
							<div className="flex gap-3">
								<div className="flex-1 relative">
									<input
										type="text"
										value={newMessage}
										onChange={(e) => setNewMessage(e.target.value)}
										placeholder="Type your message..."
										className="w-full px-4 py-3  bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										disabled={!isConnected}
									/>
								</div>
								<button
									type="submit"
									disabled={!isConnected || !newMessage.trim()}
									className="px-6 py-3 bg-linear-to-r  bg-blue-600 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform   flex items-center gap-2"
								>
									<Send />
									Send
								</button>
							</div>
						</form>
					</div>
				</div>

				{isOpen && (
					<div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 shadow-xl lg:relative lg:shadow-none z-10 transform transition-transform duration-300 ease-in-out">
						<ChannelMembers id={id!} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatWindow;
