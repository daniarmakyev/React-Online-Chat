interface FormFieldProps {
	channelName: string;
	onChannelNameChange: (value: string) => void;
	loading: boolean;
}

const FormField = ({
	channelName,
	onChannelNameChange,
	loading,
}: FormFieldProps) => {
	return (
		<div className="mb-6">
			<label
				htmlFor="channelName"
				className="block text-sm font-semibold text-slate-700 mb-2"
			>
				Channel Name
			</label>
			<input
				id="channelName"
				type="text"
				value={channelName}
				onChange={(e) => onChannelNameChange(e.target.value)}
				placeholder="Enter channel name..."
				className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline focus:outline-gray-500 transition-colors"
				disabled={loading}
				autoFocus
			/>
		</div>
	);
};

export default FormField;
