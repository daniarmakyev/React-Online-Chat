import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import type { IRegisterData } from "../types";
import LoginInput from "../components/LoginInput";
import { registerUser } from "../store/action/user.action";

const RegisterPage = () => {
	const [registerData, setRegisterData] = useState<IRegisterData>({
		email: "",
		password: "",
		username: "",
	});

	const dispatch = useAppDispatch();
	const { userRegisterLoading, userRegisterError } = useAppSelector(
		(state) => state.user,
	);

	function onSubmit() {
		for (const value of Object.values(registerData)) {
			if (!value.trim()) {
				return alert("Fill all inputs!");
			}
		}

		dispatch(registerUser(registerData));
	}

	return (
		<div className="bg-zinc-800 h-screen text-white flex justify-center items-center">
			<form
				className="bg-white p-6 rounded-xl flex flex-col gap-4 w-full max-w-[320px] text-black"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
			>
				<LoginInput
					required
					type="text"
					placeholder="Username"
					onChange={(e) =>
						setRegisterData({
							...registerData,
							username: e.target.value,
						})
					}
				/>

				<LoginInput
					required
					type="email"
					placeholder="Email"
					onChange={(e) =>
						setRegisterData({
							...registerData,
							email: e.target.value,
						})
					}
				/>

				<LoginInput
					required
					type="password"
					placeholder="Password"
					onChange={(e) =>
						setRegisterData({
							...registerData,
							password: e.target.value,
						})
					}
				/>

				<button type="submit" className="border p-2 rounded">
					{userRegisterLoading ? "Loading..." : "Sign up"}
				</button>

				{userRegisterError && (
					<p className="text-red-500 text-sm text-center">
						{userRegisterError}
					</p>
				)}

				<span>
					Have account?{" "}
					<Link to={"/"}>
						<strong>Sign in!</strong>
					</Link>
				</span>
			</form>
		</div>
	);
};

export default RegisterPage;
