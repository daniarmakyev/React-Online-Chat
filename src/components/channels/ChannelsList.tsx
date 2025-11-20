import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	getChannelList,
	joinChannel,
	leaveChannel,
	deleteChannel,
} from "../../store/action/channel.action";
import { useNavigate } from "react-router-dom";

import ChannelsHeader from "./ChannelsHeader";
import ChannelsContent from "./ChannelsContent";

import UserSearch from "./UserSearch";
import CreateChannelModal from "./modals/CreateChannelModal";

const ChannelsList = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userId = localStorage.getItem("id");

	const {
		channelList,
		channelListLoading,
		channelListError,
		joinChannelLoading,
		leaveChannelLoading,
		deleteChannelLoading,
	} = useAppSelector((state) => state.channel);

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	useEffect(() => {
		dispatch(getChannelList());
	}, [dispatch]);

	const isActionLoading =
		joinChannelLoading || leaveChannelLoading || deleteChannelLoading;

	const handleJoinChannel = (channelId: string) => {
		dispatch(joinChannel(channelId));
	};

	const handleLeaveDeleteChannel = (channelId: string) => {
		const channel = channelList.find((ch) => ch._id === channelId);
		const isOwner = channel?.owner._id === userId;

		if (isOwner) {
			dispatch(deleteChannel(channelId));
		} else {
			dispatch(leaveChannel(channelId));
		}
	};

	const handleNavigateToChat = (channelId: string, channelName: string) => {
		navigate(`/chat/${channelId}/${channelName}`);
	};

	return (
		<div className="min-h-screen from-slate-50 to-slate-100 p-6">
			<div className="max-w-4xl mx-auto">
				<ChannelsHeader onCreateClick={() => setIsCreateModalOpen(true)} />
				<UserSearch />

				<ChannelsContent
					channels={channelList}
					loading={channelListLoading}
					userId={userId}
					isActionLoading={isActionLoading}
					onJoin={handleJoinChannel}
					onLeaveDelete={handleLeaveDeleteChannel}
					onNavigate={handleNavigateToChat}
				/>

				{channelListError && (
					<div className="mt-4 bg-red-50 border-2 border-red-200 rounded-2xl p-4">
						<p className="text-red-600 font-medium">{channelListError}</p>
					</div>
				)}
			</div>

			<CreateChannelModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
			/>
		</div>
	);
};

export default ChannelsList;
