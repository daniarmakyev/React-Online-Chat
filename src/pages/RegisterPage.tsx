import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import type { IRegisterData } from "../types";
import { registerUser } from "../store/action/user.action";
import Loader from "../components/ui/Loader";
import { LoginInput } from "../components/ui/LoginInput";
import { Link } from "react-router-dom";

const EmailIcon = () => (
	<svg
		className="w-5 h-5"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
		/>
	</svg>
);

const LockIcon = () => (
	<svg
		className="w-5 h-5"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
		/>
	</svg>
);

const UserIcon = () => (
	<svg
		className="w-5 h-5"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
		/>
	</svg>
);

const RegisterPage = () => {
	const [registerData, setRegisterData] = useState<IRegisterData>({
		email: "",
		password: "",
		username: "",
	});

	const dispatch = useAppDispatch();
	const { userRegisterLoading, userRegisterError, userRegisterSucces } =
		useAppSelector((state) => state.user);

	async function onSubmit() {
		for (const value of Object.values(registerData)) {
			if (!value.trim()) {
				return alert("Fill all inputs!");
			}
		}

		dispatch(registerUser(registerData));

		if (userRegisterSucces) {
			setRegisterData({
				email: "",
				password: "",
				username: "",
			});
		}
	}

	return (
		<div className="bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen text-white flex justify-center items-center p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8 animate-fade-in">
					<div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-500/50">
						<svg
							className="w-8 h-8 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold bg-linear-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
						Create Account
					</h1>
					<p className="text-gray-400 mt-2">Join us and start your journey</p>
				</div>

				<div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8 rounded-2xl shadow-2xl space-y-6">
					<LoginInput
						required
						type="text"
						placeholder="Username"
						value={registerData.username}
						onChange={(e) =>
							setRegisterData({ ...registerData, username: e.target.value })
						}
						icon={<UserIcon />}
					/>

					<LoginInput
						required
						type="email"
						placeholder="Email"
						value={registerData.email}
						onChange={(e) =>
							setRegisterData({ ...registerData, email: e.target.value })
						}
						icon={<EmailIcon />}
					/>

					<LoginInput
						required
						type="password"
						placeholder="Password"
						value={registerData.password}
						onChange={(e) =>
							setRegisterData({ ...registerData, password: e.target.value })
						}
						icon={<LockIcon />}
					/>

					<button
						onClick={(e) => {
							e.preventDefault();
							onSubmit();
						}}
						disabled={userRegisterLoading}
						className="w-full bg-linear-to-r from-purple-500 to-pink-600 text-white font-semibold p-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{userRegisterLoading ? <Loader /> : "Sign up"}
					</button>

					{userRegisterError && (
						<div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center animate-shake">
							{userRegisterError}
						</div>
					)}

					{userRegisterSucces && (
						<div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm text-center">
							✓ You have successfully registered!
						</div>
					)}

					<div className="text-center text-gray-400 text-sm">
						Already have an account?{" "}
						<span className="text-purple-500 font-semibold hover:text-purple-400 transition-colors cursor-pointer">
							<Link to="/">Sign in</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
