import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	getChannelList,
	joinChannel,
	leaveChannel,
	deleteChannel,
} from "../../store/action/channel.action";
import { useNavigate } from "react-router-dom";
import CreateChannelModal from "./CreateChannelModal";
import ChannelCard from "./ChannelCard";
import Loader from "../ui/Loader";
import UserSearch from "./UserSearch";
import NoChannels from "../../assets/NoChannels.svg?react";
const ChannelsList = () => {
	const dispatch = useAppDispatch();
	const {
		channelList,
		channelListLoading,
		channelListError,
		joinChannelLoading,
		leaveChannelLoading,
		deleteChannelLoading,
	} = useAppSelector((state) => state.channel);

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const id = localStorage.getItem("id");
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getChannelList());
	}, [dispatch]);

	const isActionLoading =
		joinChannelLoading || leaveChannelLoading || deleteChannelLoading;

	return (
		<div className="min-h-screen  from-slate-50 to-slate-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-4xl font-bold text-slate-800 mb-2">Channels</h1>
					</div>
					<button
						onClick={() => setIsCreateModalOpen(true)}
						className="px-4 py-2  bg-emerald-500 text-white font-semibold rounded-lg  transition-all shadow-md hover:shadow-lg"
					>
						+ Create Channel
					</button>
				</div>
				<UserSearch />
				<div className="space-y-4">
					{channelListLoading ? (
						<div className="bg-white rounded-2xl shadow-lg p-8 text-center">
							<Loader />
						</div>
					) : channelList.length === 0 ? (
						<div className="bg-white rounded-2xl shadow-lg p-8 text-center">
							<NoChannels />
							<p className="text-slate-600 text-lg">No channels</p>
						</div>
					) : (
						id &&
						channelList.map((item) => {
							const isOwner = item.owner._id === id;
							const isMember = item.participants.some(
								(user) => user._id === id,
							);

							return (
								<ChannelCard
									key={item._id}
									channel={item}
									isOwner={isOwner}
									isMember={isMember}
									isActionLoading={isActionLoading}
									onJoinOpen={(channelId: string) => {
										if (isMember) {
											navigate(`/chat/${item._id}/${item.name}`);
										} else {
											dispatch(joinChannel(channelId));
										}
									}}
									onLeaveDelete={(channelId: string) => {
										if (isOwner) {
											dispatch(deleteChannel(channelId));
										} else {
											dispatch(leaveChannel(channelId));
										}
									}}
								/>
							);
						})
					)}
				</div>

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
