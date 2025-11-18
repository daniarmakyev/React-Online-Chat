import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import $axios from "../../api/axios";
import type {
	IChannel,
	IGetChannelParticipantsResponse,
	IMessage,
} from "../../types";

export const getChannelList = createAsyncThunk<IChannel[], void>(
	"channel/getList",
	async () => {
		try {
			const response = await $axios.get("/channel/list");
			return response.data.channels;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to get channels!";
			throw new Error(message);
		}
	},
);

export const createChannel = createAsyncThunk<IChannel, { name: string }>(
	"channel/create",

	async (data, thunkAPI) => {
		try {
			const response = await $axios.post("/channel/create", data);

			thunkAPI.dispatch(getChannelList());

			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to create channel!";
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const joinChannel = createAsyncThunk<IChannel, string>(
	"channel/join",
	async (channelId, thunkAPI) => {
		try {
			const response = await $axios.post(`/channel/${channelId}/join`);

			thunkAPI.dispatch(getChannelList());

			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to join channel!";
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const leaveChannel = createAsyncThunk<{ message: string }, string>(
	"channel/leave",
	async (channelId, thunkAPI) => {
		try {
			const response = await $axios.post(`/channel/${channelId}/leave`);

			thunkAPI.dispatch(getChannelList());

			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to leave channel!";
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const deleteChannel = createAsyncThunk<{ message: string }, string>(
	"channel/delete",
	async (channelId) => {
		try {
			const response = await $axios.delete(`/channel/${channelId}`);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to delete channel!";
			throw new Error(message);
		}
	},
);

export const removeParticipant = createAsyncThunk<
	{ message: string },
	{ channelId: string; participantId: string }
>("channel/removeParticipant", async ({ channelId, participantId }) => {
	try {
		const response = await $axios.delete(
			`/channel/${channelId}/participants/${participantId}`,
		);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<{ message: string }>;
		const message =
			error.response?.data?.message || "Failed to remove participant!";
		throw new Error(message);
	}
});

export const getChannelMessages = createAsyncThunk<IMessage[], string>(
	"channel/getMessages",
	async (channelId) => {
		try {
			const response = await $axios.get(`/channel/${channelId}/messages`);
			return response.data.messages;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to get messages!";
			throw new Error(message);
		}
	},
);

export const getChannelParticipant = createAsyncThunk<
	IGetChannelParticipantsResponse,
	string
>("channel/getParticipants", async (channelId) => {
	try {
		const response = await $axios.get<IGetChannelParticipantsResponse>(
			`/channel/${channelId}/participants`,
		);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<{ message: string }>;
		const message =
			error.response?.data?.message || "Failed to get participants!";
		throw new Error(message);
	}
});
