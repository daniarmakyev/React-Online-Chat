import type { IChannel } from "../../types";
import Member from "../../assets/Member.svg?react";
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
		<div className="bg-white rounded-md shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] transition-all p-6">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<h3 className="text-xl font-bold text-slate-800 truncate max-w-md">
							{channel.name}
						</h3>
						{isOwner && (
							<span className="px-3 py-1   bg-emerald-500 text-white text-xs font-semibold rounded-lg">
								Owner
							</span>
						)}
					</div>
					<div className="flex items-center gap-2 text-slate-600">
						<Member />
						<span className="text-sm">
							{channel.participants.length} members
						</span>
					</div>
				</div>

				<div className="flex gap-3">
					{isMember && (
						<button
							onClick={() => onLeaveDelete(channel._id)}
							disabled={isActionLoading}
							className="px-5 py-1.5 border-2 border-red-400 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isOwner ? "Delete" : "Leave"}
						</button>
					)}

					<button
						onClick={() => onJoinOpen(channel._id)}
						disabled={isActionLoading}
						className="px-5 py-1.5 bg-linear-to-r bg-emerald-500  text-white font-semibold rounded-lg  transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
					>
						{isMember ? "Open" : "Join"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChannelCard;
