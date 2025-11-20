import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
	getChannelParticipant,
	removeParticipant,
} from "../../../store/action/channel.action";
import Loader from "../../ui/Loader";
import EmptyState from "../../ui/EmptyState";
import MembersHeader from "./MembersHeader";
import MembersList from "./MembersList";
import OwnerSection from "./OwnerSection";

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

	const handleRemoveParticipant = (participantId: string) => {
		dispatch(removeParticipant({ channelId: id, participantId }));
	};

	if (channelParticipantLoading) {
		return (
			<div className="w-full h-full bg-white border-l border-gray-200 overflow-y-auto">
				<div className="flex justify-center items-center h-32">
					<Loader />
				</div>
			</div>
		);
	}

	if (channelParticipantError) {
		return (
			<div className="w-full h-full bg-white border-l border-gray-200 overflow-y-auto">
				<div className="text-center p-4">
					<div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
						<svg
							className="w-6 h-6 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<p className="text-red-500 font-medium">Error loading members</p>
					<p className="text-red-400 text-sm mt-1">{channelParticipantError}</p>
				</div>
			</div>
		);
	}

	if (!channelParticipant) {
		return <EmptyState message="No members found" />;
	}

	return (
		<div className="w-full h-full bg-white border-l border-gray-200 overflow-y-auto">
			<div className="p-6">
				<MembersHeader
					participantCount={channelParticipant.participants.length}
				/>

				<OwnerSection owner={channelParticipant.owner} currentUserId={userId} />

				<MembersList
					participants={channelParticipant.participants}
					ownerId={channelParticipant.owner?._id}
					currentUserId={userId}
					channelId={id}
					onRemoveParticipant={handleRemoveParticipant}
					removeParticipantLoading={removeParticipantLoading}
				/>
			</div>
		</div>
	);
};

export default ChannelMembers;
