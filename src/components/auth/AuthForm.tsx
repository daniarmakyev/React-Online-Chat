import type { ReactNode } from "react";
import Loader from "../ui/Loader";

interface AuthFormProps {
	children: ReactNode;
	onSubmit: (e: React.MouseEvent) => void;
	loading: boolean;
	submitText: string;
	error?: string | null;
	success?: string | null;
	footer: ReactNode;
}

const AuthForm = ({
	children,
	onSubmit,
	loading,
	submitText,
	error,
	success,
	footer,
}: AuthFormProps) => {
	return (
		<>
			{children}

			<button
				onClick={onSubmit}
				disabled={loading}
				className="w-full bg-linear-to-r from-purple-500 to-pink-600 text-white font-semibold p-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			>
				{loading ? <Loader /> : submitText}
			</button>

			{error && (
				<div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center animate-shake">
					{error}
				</div>
			)}

			{success && (
				<div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm text-center">
					✓ {success}
				</div>
			)}

			{footer}
		</>
	);
};

export default AuthForm;
