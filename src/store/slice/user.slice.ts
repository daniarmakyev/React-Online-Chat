import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types";
import { loginUser, registerUser } from "../action/user.action";

interface IUserState {
	userRegisterSucces: IUser | null;
	userRegisterLoading: boolean;
	userRegisterError: string;
	userLoginSucces: IUser | null;
	userLoginLoading: boolean;
	userLoginError: string;
}

const INIT_STATE: IUserState = {
	userRegisterSucces: null,
	userRegisterLoading: false,
	userRegisterError: "",
	userLoginSucces: null,
	userLoginLoading: false,
	userLoginError: "",
};

const userSlice = createSlice({
	name: "user",
	initialState: INIT_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.userRegisterLoading = true;
				state.userRegisterError = "";
				state.userRegisterSucces = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.userRegisterSucces = payload;
				state.userRegisterLoading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.userRegisterLoading = false;
				state.userRegisterError = action.error.message!;
				state.userRegisterSucces = null;
			})
			.addCase(loginUser.pending, (state) => {
				state.userLoginLoading = true;
				state.userLoginError = "";
				state.userLoginSucces = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.userLoginSucces = payload.user;
				state.userLoginLoading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.userLoginLoading = false;
				state.userLoginError = action.error.message!;
				state.userLoginSucces = null;
			});
	},
});

export default userSlice.reducer;
