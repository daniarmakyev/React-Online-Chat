import type { FormEvent } from "react";
import FormField from "./FormField";
import FormActions from "./FormActions";

interface ChannelFormProps {
	channelName: string;
	onChannelNameChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
	onCancel: () => void;
	loading: boolean;
	error: string | null;
}

const ChannelForm = ({
	channelName,
	onChannelNameChange,
	onSubmit,
	onCancel,
	loading,
	error,
}: ChannelFormProps) => {
	return (
		<>
			<h2 className="text-2xl font-bold text-slate-800 mb-6">
				Create New Channel
			</h2>

			<form onSubmit={onSubmit}>
				<FormField
					channelName={channelName}
					onChannelNameChange={onChannelNameChange}
					loading={loading}
				/>

				{error && (
					<div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
						<p className="text-red-600 text-sm font-medium">{error}</p>
					</div>
				)}

				<FormActions
					onCancel={onCancel}
					loading={loading}
					channelName={channelName}
				/>
			</form>
		</>
	);
};

export default ChannelForm;
