import { Link } from "react-router-dom";

const LoginPage = () => {
	return (
		<div className="bg-zinc-800 h-screen text-white flex justify-center items-center">
			<form className="bg-white p-6 rounded-xl flex flex-col gap-4 w-full max-w-[320px] text-black">
				<input
					type="email"
					className="border p-2 rounded"
					placeholder="Email"
				/>
				<input
					type="password"
					className="border p-2 rounded"
					placeholder="Password"
				/>
				<button type="submit" className="border p-2 rounded">
					Sign in
				</button>
				<span>
					Dont have account?{" "}
					<Link to={"/signup"}>
						<strong>Sign up!</strong>
					</Link>
				</span>
			</form>
		</div>
	);
};

export default LoginPage;
