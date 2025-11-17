import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slice/user.slice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
