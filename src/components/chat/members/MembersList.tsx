import EmptyState from "../../ui/EmptyState";
import MemberItem from "./MemberItem";

interface MembersListProps {
	participants: Array<{ _id: string; username: string }>;
	ownerId?: string;
	currentUserId: string | null;
	channelId: string;
	onRemoveParticipant: (participantId: string) => void;
	removeParticipantLoading: boolean;
}

const MembersList = ({
	participants,
	ownerId,
	currentUserId,

	onRemoveParticipant,
	removeParticipantLoading,
}: MembersListProps) => {
	const regularParticipants = participants.filter(
		(participant) => participant._id !== ownerId,
	);

	if (regularParticipants.length === 0) {
		return <EmptyState message="No other members in this channel" />;
	}

	return (
		<div>
			<h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
				Members ({regularParticipants.length})
			</h4>
			<ul className="space-y-2">
				{regularParticipants.map((member) => (
					<MemberItem
						key={member._id}
						member={member}
						isOwner={currentUserId === ownerId}
						isCurrentUser={currentUserId === member._id}
						onRemove={() => onRemoveParticipant(member._id)}
						removeLoading={removeParticipantLoading}
					/>
				))}
			</ul>
		</div>
	);
};

export default MembersList;
