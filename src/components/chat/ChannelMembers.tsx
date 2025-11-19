import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	getChannelParticipant,
	removeParticipant,
} from "../../store/action/channel.action";
import Loader from "../ui/Loader";

const ChannelMembers = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();
	const userId = localStorage.getItem("id");

	const {
		channelParticipant,
		channelParticipantError,
		channelParticipantLoading,
		removeParticipantLoading,
	} = useAppSelector((state) => state.channel);

	useEffect(() => {
		dispatch(getChannelParticipant(id));
	}, [id, dispatch]);

	const handleRemoveMember = async (participantId: string) => {
		dispatch(removeParticipant({ channelId: id, participantId }));
		dispatch(getChannelParticipant(id));
	};

	return (
		<div className="fixed w-[20%] right-0 overflow-y-auto p-4 bg-white border-l h-full">
			{channelParticipantLoading ? (
				<Loader />
			) : channelParticipantError ? (
				<div className="fixed w-[20%] right-0 p-4 bg-white border-l">
					<p className="text-red-500">Error: {channelParticipantError}</p>
				</div>
			) : channelParticipant ? (
				<>
					<h3 className="font-bold mb-4 text-lg">
						Members ({channelParticipant.participants.length})
					</h3>

					<ul className="space-y-2">
						{channelParticipant.participants.map((member) => {
							const isOwner = channelParticipant.owner!._id === member._id;
							const isYou = userId === member._id;
							const canRemove =
								userId === channelParticipant.owner!._id && !isOwner && !isYou;

							return (
								<li
									key={member._id}
									className="border-b border-gray-200 pb-2 flex justify-between items-center"
								>
									<div>
										<p
											className={`font-medium ${
												isOwner ? "text-blue-500" : "text-gray-800"
											}`}
										>
											{member.username}
										</p>
										<p className="text-xs text-gray-500">
											{isOwner && "Owner"}
											{!isOwner && isYou && "You"}
											{!isOwner && !isYou && "Member"}
										</p>
									</div>

									{canRemove && (
										<button
											onClick={() => handleRemoveMember(member._id)}
											disabled={removeParticipantLoading}
											className={`text-xs px-2 py-1 bg-red-500 text-white rounded  disabled:opacity-50 disabled:cursor-not-allowed ${
												removeParticipantLoading && "bg-white! rounded-none!"
											}
`}
										>
											{removeParticipantLoading ? <Loader /> : "Remove"}
										</button>
									)}
								</li>
							);
						})}
					</ul>
				</>
			) : (
				<div className="fixed w-[20%] right-0 p-4 bg-white border-l">
					<p className="text-gray-400">No members</p>
				</div>
			)}
		</div>
	);
};

export default ChannelMembers;
