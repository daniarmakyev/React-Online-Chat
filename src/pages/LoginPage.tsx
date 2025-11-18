import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import type { ILoginData } from "../types";
import LoginInput from "../components/ui/LoginInput";
import { loginUser } from "../store/action/user.action";

const LoginPage = () => {
	const [loginData, setLoginData] = useState<ILoginData>({
		email: "",
		password: "",
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { userLoginLoading, userLoginError } = useAppSelector(
		(state) => state.user,
	);

	async function onSubmit() {
		for (const value of Object.values(loginData)) {
			if (!value.trim()) {
				return alert("Fill all inputs!");
			}
		}

		dispatch(loginUser({ data: loginData, navigate }));
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
					type="email"
					placeholder="Email"
					value={loginData.email}
					onChange={(e) =>
						setLoginData({
							...loginData,
							email: e.target.value,
						})
					}
				/>

				<LoginInput
					required
					type="password"
					placeholder="Password"
					value={loginData.password}
					onChange={(e) =>
						setLoginData({
							...loginData,
							password: e.target.value,
						})
					}
				/>

				<button type="submit" className="border p-2 rounded cursor-pointer">
					{userLoginLoading ? "Loading..." : "Sign in"}
				</button>

				{userLoginError && (
					<p className="text-red-500 text-sm text-center">{userLoginError}</p>
				)}

				<span>
					Don't have account?{" "}
					<Link to={"/signup"}>
						<strong>Sign up!</strong>
					</Link>
				</span>
			</form>
		</div>
	);
};

export default LoginPage;
