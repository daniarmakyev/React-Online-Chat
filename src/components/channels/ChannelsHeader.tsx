interface ChannelsHeaderProps {
	onCreateClick: () => void;
}

const ChannelsHeader = ({ onCreateClick }: ChannelsHeaderProps) => {
	return (
		<div className="mb-8 flex items-center justify-between">
			<div>
				<h1 className="text-4xl font-bold text-slate-800 mb-2">Channels</h1>
			</div>
			<button
				onClick={onCreateClick}
				className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
			>
				+ Create Channel
			</button>
		</div>
	);
};

export default ChannelsHeader;
