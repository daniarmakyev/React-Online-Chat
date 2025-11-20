import ChannelCard from "./ChannelCard";
import Loader from "../ui/Loader";
import NoChannels from "../../assets/NoChannels.svg?react";
import type { IChannel } from "../../types";

interface ChannelsContentProps {
	channels: IChannel[];
	loading: boolean;
	userId: string | null;
	isActionLoading: boolean;
	onJoin: (channelId: string) => void;
	onLeaveDelete: (channelId: string) => void;
	onNavigate: (channelId: string, channelName: string) => void;
}

const ChannelsContent = ({
	channels,
	loading,
	userId,
	isActionLoading,
	onJoin,
	onLeaveDelete,
	onNavigate,
}: ChannelsContentProps) => {
	if (loading) {
		return (
			<div className="bg-white rounded-2xl shadow-lg p-8 text-center">
				<Loader />
			</div>
		);
	}

	if (channels.length === 0) {
		return (
			<div className="bg-white rounded-2xl shadow-lg p-8 text-center">
				<NoChannels />
				<p className="text-slate-600 text-lg">No channels</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{userId &&
				channels.map((channel) => {
					const isOwner = channel.owner._id === userId;
					const isMember = channel.participants.some(
						(user) => user._id === userId,
					);

					return (
						<ChannelCard
							key={channel._id}
							channel={channel}
							isOwner={isOwner}
							isMember={isMember}
							isActionLoading={isActionLoading}
							onJoinOpen={() => {
								if (isMember) {
									onNavigate(channel._id, channel.name);
								} else {
									onJoin(channel._id);
								}
							}}
							onLeaveDelete={() => onLeaveDelete(channel._id)}
						/>
					);
				})}
		</div>
	);
};

export default ChannelsContent;
