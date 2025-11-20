import ChannelMembers from "./members/ChannelMembers";

interface MembersSidebarProps {
	isOpen: boolean;
	channelId: string;
}

const MembersSidebar = ({ isOpen, channelId }: MembersSidebarProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 shadow-xl lg:relative lg:shadow-none z-10 transform transition-transform duration-300 ease-in-out">
			<ChannelMembers id={channelId} />
		</div>
	);
};

export default MembersSidebar;
