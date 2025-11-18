import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	getChannelList,
	joinChannel,
	leaveChannel,
	deleteChannel,
} from "../../store/action/channel.action";
import { useNavigate } from "react-router-dom";

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

	const id = localStorage.getItem("id");

	useEffect(() => {
		dispatch(getChannelList());
	}, [dispatch]);

	const handleJoinChannel = async (channelId: string) => {
		dispatch(joinChannel(channelId));
	};

	const handleLeaveChannel = async (channelId: string) => {
		dispatch(leaveChannel(channelId));
	};

	const handleDeleteChannel = async (channelId: string) => {
		dispatch(deleteChannel(channelId));
	};

	const navigate = useNavigate();

	const isActionLoading =
		joinChannelLoading || leaveChannelLoading || deleteChannelLoading;

	return (
		<div>
			<ul className="flex flex-col gap-2 max-w-[320px]">
				{channelListLoading ? (
					<span>Loading...</span>
				) : (
					channelList &&
					id &&
					channelList.map((item) => {
						const isOwner = item.owner._id === id;
						const isMember = item.participants.some((user) => user._id === id);
						const handleChannelAction = (channelId: string) => {
							if (isOwner) {
								handleDeleteChannel(channelId);
							} else {
								handleLeaveChannel(channelId);
							}
						};
						const handleJoinOpenChannel = (channelId: string) => {
							if (isMember) {
								navigate(`/chat/${item._id}`);
							} else {
								handleJoinChannel(channelId);
							}
						};
						return (
							<li
								key={item._id}
								className="border p-2 rounded flex justify-between items-center gap-2"
							>
								<section className="flex flex-col">
									<h5 className="font-bold truncate max-w-[150px]">
										{item.name}
									</h5>
									<span className="text-sm text-gray-600">
										Участников: {item.participants.length}
									</span>
								</section>

								<div className="flex gap-2">
									{isMember && (
										<button
											onClick={() => handleChannelAction(item._id)}
											disabled={isActionLoading}
											className="border rounded border-red-500 hover:bg-red-100 py-1 px-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{isOwner ? "Delete" : "Leave"}
										</button>
									)}

									<button
										onClick={() => handleJoinOpenChannel(item._id)}
										disabled={isActionLoading}
										className="border rounded border-green-500 hover:bg-green-100 py-1 px-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isMember ? "Open" : "Join"}
									</button>
								</div>
							</li>
						);
					})
				)}
				{channelListError && (
					<span className="text-red-500">{channelListError}</span>
				)}
			</ul>
		</div>
	);
};

export default ChannelsList;
