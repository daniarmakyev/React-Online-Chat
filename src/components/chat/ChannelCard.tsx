import type { IChannel } from "../../types";

interface ChannelCardProps {
	channel: IChannel;
	isOwner: boolean;
	isMember: boolean;
	isActionLoading: boolean;
	onJoinOpen: (channelId: string) => void;
	onLeaveDelete: (channelId: string) => void;
}

const ChannelCard = ({
	channel,
	isOwner,
	isMember,
	isActionLoading,
	onJoinOpen,
	onLeaveDelete,
}: ChannelCardProps) => {
	return (
		<div className="bg-white rounded-2xl shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] transition-all p-6">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<h3 className="text-xl font-bold text-slate-800 truncate max-w-md">
							{channel.name}
						</h3>
						{isOwner && (
							<span className="px-3 py-1   bg-emerald-600 text-white text-xs font-semibold rounded-lg">
								Owner
							</span>
						)}
					</div>
					<div className="flex items-center gap-2 text-slate-600">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span className="text-sm">
							{channel.participants.length} member
							{channel.participants.length !== 1 ? "s" : ""}
						</span>
					</div>
				</div>

				<div className="flex gap-3">
					{isMember && (
						<button
							onClick={() => onLeaveDelete(channel._id)}
							disabled={isActionLoading}
							className="px-5 py-2.5 border-2 border-red-400 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isOwner ? "Delete" : "Leave"}
						</button>
					)}

					<button
						onClick={() => onJoinOpen(channel._id)}
						disabled={isActionLoading}
						className="px-5 py-2.5 bg-linear-to-r from-emerald-400 to-teal-400 text-white font-semibold rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
					>
						{isMember ? "Open" : "Join"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChannelCard;
