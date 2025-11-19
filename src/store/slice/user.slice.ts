import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types";
import { loginUser, registerUser, searchUsers } from "../action/user.action";

interface IUserState {
	userRegisterSucces: IUser | null;
	userRegisterLoading: boolean;
	userRegisterError: string;

	userLoginSucces: IUser | null;
	userLoginLoading: boolean;
	userLoginError: string;

	searchResults: IUser[];
	searchLoading: boolean;
	searchError: string;
}

const INIT_STATE: IUserState = {
	userRegisterSucces: null,
	userRegisterLoading: false,
	userRegisterError: "",

	userLoginSucces: null,
	userLoginLoading: false,
	userLoginError: "",

	searchResults: [],
	searchLoading: false,
	searchError: "",
};

const userSlice = createSlice({
	name: "user",
	initialState: INIT_STATE,
	reducers: {
		clearSearchResults: (state) => {
			state.searchResults = [];
			state.searchError = "";
		},
	},
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
				state.userLoginSucces = payload;
				state.userLoginLoading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.userLoginLoading = false;
				state.userLoginError = action.error.message!;
				state.userLoginSucces = null;
			})
			.addCase(searchUsers.pending, (state) => {
				state.searchLoading = true;
				state.searchError = "";
			})
			.addCase(searchUsers.fulfilled, (state, { payload }) => {
				state.searchResults = payload;
				state.searchLoading = false;
			})
			.addCase(searchUsers.rejected, (state, action) => {
				state.searchLoading = false;
				state.searchError = action.error.message!;
				state.searchResults = [];
			});
	},
});

export const { clearSearchResults } = userSlice.actions;
export default userSlice.reducer;
