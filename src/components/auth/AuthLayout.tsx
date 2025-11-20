import type { ReactNode } from "react";

interface AuthLayoutProps {
	children: ReactNode;
	icon: ReactNode;
	title: string;
	subtitle: string;
	gradientFrom: string;
	gradientTo: string;
}

const AuthLayout = ({
	children,
	icon,
	title,
	subtitle,
	gradientFrom,
	gradientTo,
}: AuthLayoutProps) => {
	return (
		<div className="bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen text-white flex justify-center items-center p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8 animate-fade-in">
					<div
						className={`w-16 h-16 bg-linear-to-br ${gradientFrom} ${gradientTo} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg ${
							gradientFrom.split(" ")[0]
						}-500/50`}
					>
						{icon}
					</div>
					<h1
						className={`text-3xl font-bold bg-linear-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
					>
						{title}
					</h1>
					<p className="text-gray-400 mt-2">{subtitle}</p>
				</div>

				<div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8 rounded-2xl shadow-2xl space-y-6">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
