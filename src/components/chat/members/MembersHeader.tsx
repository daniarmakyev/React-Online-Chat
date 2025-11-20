interface MembersHeaderProps {
	participantCount: number;
}

const MembersHeader = ({ participantCount }: MembersHeaderProps) => {
	return (
		<div className="mb-6">
			<h3 className="font-bold text-lg text-gray-800 mb-1">Channel Members</h3>
			<div className="flex items-center gap-2 text-sm text-gray-600">
				<span>{participantCount} members</span>
			</div>
		</div>
	);
};

export default MembersHeader;
