import type { LoginInputProps } from "../../types";

export const LoginInput = ({
	required = false,
	placeholder,
	value,
	type,
	onChange,
	icon,
}: LoginInputProps) => {
	return (
		<div className="relative group">
			{icon && (
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors">
					{icon}
				</div>
			)}
			<input
				required={required}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={`w-full bg-zinc-800/50 border border-zinc-700 text-white p-3 rounded-lg focus:outline-none focus:border-pink-500 transition-all duration-300 ${
					icon ? "pl-10" : ""
				}`}
			/>
		</div>
	);
};
