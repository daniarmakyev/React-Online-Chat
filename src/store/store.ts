import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slice/user.slice";
import { useDispatch, useSelector } from "react-redux";
import channelReducer from "../store/slice/channel.slice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		channel: channelReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
