import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import type { IRegisterData } from "../types";
import { registerUser } from "../store/action/user.action";
import { LoginInput } from "../components/ui/LoginInput";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import {
	UserIcon,
	EmailIcon,
	LockIcon,
	RegisterIcon,
} from "../components/auth/AuthIcons";

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

	const formFooter = (
		<div className="text-center text-gray-400 text-sm">
			Already have an account?{" "}
			<span className="text-purple-500 font-semibold hover:text-purple-400 transition-colors cursor-pointer">
				<Link to="/">Sign in</Link>
			</span>
		</div>
	);

	return (
		<AuthLayout
			icon={<RegisterIcon />}
			title="Create Account"
			subtitle="Join us and start your journey"
			gradientFrom="from-purple-500"
			gradientTo="to-pink-600"
		>
			<AuthForm
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				loading={userRegisterLoading}
				submitText="Sign up"
				error={userRegisterError}
				success={
					userRegisterSucces ? "You have successfully registered!" : null
				}
				footer={formFooter}
			>
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
			</AuthForm>
		</AuthLayout>
	);
};

export default RegisterPage;
