import Loader from "../../ui/Loader";

interface MemberItemProps {
	member: {
		_id: string;
		username: string;
	};
	isOwner: boolean;
	isCurrentUser: boolean;
	onRemove: () => void;
	removeLoading: boolean;
}

const MemberItem = ({
	member,
	isOwner,
	isCurrentUser,
	onRemove,
	removeLoading,
}: MemberItemProps) => {
	const canRemove = isOwner && !isCurrentUser;

	return (
		<li className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
					{member.username?.charAt(0).toUpperCase()}
				</div>
				<div>
					<p className="font-medium text-gray-800 flex items-center gap-2">
						{member.username}
						{isCurrentUser && (
							<span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
								You
							</span>
						)}
					</p>
					<p className="text-xs text-gray-500">Member</p>
				</div>
			</div>

			{canRemove && (
				<button
					onClick={onRemove}
					disabled={removeLoading}
					className=" px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
				>
					{removeLoading ? (
						<Loader />
					) : (
						<>
							<svg
								className="w-3 h-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
							Remove
						</>
					)}
				</button>
			)}
		</li>
	);
};

export default MemberItem;
