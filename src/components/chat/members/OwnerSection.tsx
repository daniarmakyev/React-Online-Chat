interface OwnerSectionProps {
	owner?: {
		_id: string;
		username: string;
	};
	currentUserId: string | null;
}

const OwnerSection = ({ owner, currentUserId }: OwnerSectionProps) => {
	if (!owner) return null;

	const isCurrentUser = currentUserId === owner._id;

	return (
		<div className="mb-6">
			<h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
				Owner
			</h4>
			<div className="flex items-center gap-3 p-3 from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
				<div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
					{owner.username?.charAt(0).toUpperCase()}
				</div>
				<div className="flex-1">
					<p className="font-semibold text-gray-800">
						{owner.username}
						{isCurrentUser && (
							<span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
								You
							</span>
						)}
					</p>
					<p className="text-xs text-blue-600 font-medium">Channel Owner</p>
				</div>
			</div>
		</div>
	);
};

export default OwnerSection;
