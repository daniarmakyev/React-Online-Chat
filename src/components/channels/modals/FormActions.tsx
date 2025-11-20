interface FormActionsProps {
	onCancel: () => void;
	loading: boolean;
	channelName: string;
}

const FormActions = ({ onCancel, loading, channelName }: FormActionsProps) => {
	return (
		<div className="flex gap-3">
			<button
				type="button"
				onClick={onCancel}
				disabled={loading}
				className="flex-1 px-3 py-2 border-2 border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Cancel
			</button>
			<button
				type="submit"
				disabled={loading || !channelName.trim()}
				className="flex-1 px-3 py-2 bg-emerald-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
			>
				{loading ? "Creating..." : "Create"}
			</button>
		</div>
	);
};

export default FormActions;
