import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types";
import { registerUser } from "../action/user.action";

interface IUserState {
	user: IUser | null;
	userRegisterLoading: boolean;
	userRegisterError: string;
}

const INIT_STATE: IUserState = {
	user: null,
	userRegisterLoading: false,
	userRegisterError: "",
};

const userSlice = createSlice({
	name: "user",
	initialState: INIT_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.userRegisterLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.user = payload;
				state.userRegisterLoading = false;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.userRegisterLoading = false;
				state.userRegisterError = payload!;
			});
	},
});

export default userSlice.reducer;
