import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import type { ILoginData } from "../types";
import { loginUser } from "../store/action/user.action";
import { LoginInput } from "../components/ui/LoginInput";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import { EmailIcon, LockIcon, LoginIcon } from "../components/auth/AuthIcons";

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

	const formFooter = (
		<div className="text-center text-gray-400 text-sm">
			Don't have an account?{" "}
			<span className="text-pink-500 font-semibold hover:text-pink-400 transition-colors cursor-pointer">
				<Link to="/signup">Sign up</Link>
			</span>
		</div>
	);

	return (
		<AuthLayout
			icon={<LoginIcon />}
			title="Welcome Back"
			subtitle="Sign in to continue to your account"
			gradientFrom="from-pink-500"
			gradientTo="to-purple-600"
		>
			<AuthForm
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				loading={userLoginLoading}
				submitText="Sign in"
				error={userLoginError}
				footer={formFooter}
			>
				<LoginInput
					required
					type="email"
					placeholder="Email"
					value={loginData.email}
					onChange={(e) =>
						setLoginData({ ...loginData, email: e.target.value })
					}
					icon={<EmailIcon />}
				/>

				<LoginInput
					required
					type="password"
					placeholder="Password"
					value={loginData.password}
					onChange={(e) =>
						setLoginData({ ...loginData, password: e.target.value })
					}
					icon={<LockIcon />}
				/>
			</AuthForm>
		</AuthLayout>
	);
};

export default LoginPage;
