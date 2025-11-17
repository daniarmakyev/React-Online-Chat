import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import $axios from "../../api/axios";
import type { IRegisterData, IUser } from "../../types";

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

		const message = error.response!.data.message;

		return message || "Register error!";
	}
});
