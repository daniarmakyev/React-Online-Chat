import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import $axios from "../../api/axios";
import type { IChannel, IMessage } from "../../types";

export const getChannelList = createAsyncThunk<IChannel[], void>(
	"channel/getList",
	async () => {
		try {
			const response = await $axios.get("/channels/list");
			return response.data;
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
	async (data) => {
		try {
			const response = await $axios.post("/channels/create", data);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to create channel!";
			throw new Error(message);
		}
	},
);

export const joinChannel = createAsyncThunk<IChannel, string>(
	"channel/join",
	async (channelId) => {
		try {
			const response = await $axios.post(`/channels/${channelId}/join`);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to join channel!";
			throw new Error(message);
		}
	},
);

export const leaveChannel = createAsyncThunk<{ message: string }, string>(
	"channel/leave",
	async (channelId) => {
		try {
			const response = await $axios.post(`/channels/${channelId}/leave`);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to leave channel!";
			throw new Error(message);
		}
	},
);

export const deleteChannel = createAsyncThunk<{ message: string }, string>(
	"channel/delete",
	async (channelId) => {
		try {
			const response = await $axios.delete(`/channels/${channelId}`);
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
			`/channels/${channelId}/participants/${participantId}`,
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
			const response = await $axios.get(`/channels/${channelId}/messages`);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const message =
				error.response?.data?.message || "Failed to get messages!";
			throw new Error(message);
		}
	},
);
