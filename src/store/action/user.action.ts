import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import $axios from "../../api/axios";
import type {
	IAuthResponse,
	ILoginData,
	IRegisterData,
	IUser,
} from "../../types";

export const registerUser = createAsyncThunk<
	IUser,
	IRegisterData,
	{ rejectValue: string }
>("user/register", async (data) => {
	try {
		const response = await $axios.post("/auth/register", data);
		return response.data.user;
	} catch (err) {
		const error = err as AxiosError<{ message: string }>;

		const message = error.response?.data?.message || "Register error!";

		throw new Error(message);
	}
});

export const loginUser = createAsyncThunk<
	IAuthResponse,
	ILoginData,
	{ rejectValue: string }
>("user/login", async (data) => {
	try {
		const response = await $axios.post("/auth/login", data);
		console.log(response.data);

		return response.data.user;
	} catch (err) {
		const error = err as AxiosError<{ message: string }>;

		const message = error.response?.data?.message || "Login error!";

		throw new Error(message);
	}
});
