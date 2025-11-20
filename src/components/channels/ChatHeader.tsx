import { useNavigate } from "react-router-dom";
import Back from "../../assets/Back.svg?react";
import Members from "../../assets/Members.svg?react";

interface ChatHeaderProps {
	channelName?: string;
	isConnected: boolean;
	onMembersToggle: () => void;
}

const ChatHeader = ({
	channelName,
	isConnected,
	onMembersToggle,
}: ChatHeaderProps) => {
	const navigate = useNavigate();

	return (
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
					<h2 className="font-bold text-xl text-gray-800 wrap-break-word line-clamp-2 max-w-[800px]">
						{channelName}
					</h2>
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
					onClick={onMembersToggle}
				>
					<Members />
					Members
				</button>
			</div>
		</div>
	);
};

export default ChatHeader;
