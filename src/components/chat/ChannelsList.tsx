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
						className="px-6 py-3  bg-pink-500 text-white font-semibold rounded-xl  transition-all shadow-md hover:shadow-lg"
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
							<svg
								className="w-16 h-16 text-slate-300 mx-auto mb-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
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
