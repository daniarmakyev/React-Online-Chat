import React from "react";

interface LoginInputProps {
	required?: boolean;
	placeholder?: string;
	value?: string;
	type: "text" | "email" | "password";
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
	required = false,
	placeholder,
	value,
	type,
	onChange,
}) => {
	return (
		<input
			required={required}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className="border p-2 rounded"
		/>
	);
};

export default LoginInput;
