import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createChannel } from "../../store/action/channel.action";

interface CreateChannelModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CreateChannelModal = ({ isOpen, onClose }: CreateChannelModalProps) => {
	const dispatch = useAppDispatch();
	const [channelName, setChannelName] = useState("");
	const { createChannelLoading, createChannelError } = useAppSelector(
		(state) => state.channel,
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!channelName.trim()) {
			return alert("Please enter a channel name!");
		}

		dispatch(createChannel({ name: channelName.trim() })).unwrap();
		setChannelName("");
		onClose();
	};

	const handleClose = () => {
		setChannelName("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50  0 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold text-slate-800 mb-6">
					Create New Channel
				</h2>

				<form onSubmit={handleSubmit}>
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
							onChange={(e) => setChannelName(e.target.value)}
							placeholder="Enter channel name..."
							className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
							disabled={createChannelLoading}
							autoFocus
						/>
					</div>

					{createChannelError && (
						<div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
							<p className="text-red-600 text-sm font-medium">
								{createChannelError}
							</p>
						</div>
					)}

					<div className="flex gap-3">
						<button
							type="button"
							onClick={handleClose}
							disabled={createChannelLoading}
							className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={createChannelLoading || !channelName.trim()}
							className="flex-1 px-4 py-3 bg-linear-to-r  bg-pink-500 text-white font-semibold rounded-xl  transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
						>
							{createChannelLoading ? "Creating..." : "Create"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateChannelModal;
