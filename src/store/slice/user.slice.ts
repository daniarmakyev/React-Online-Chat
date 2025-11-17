import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types";

interface IUserState {
	user: IUser | null;
}

const INIT_STATE: IUserState = { user: null };

const userSlice = createSlice({
	name: "user",
	initialState: INIT_STATE,
	reducers: {},
	extraReducers: (builder) => {},
});

export default userSlice;
