import { createSlice } from "@reduxjs/toolkit";
import type { IChannel, IMessage } from "../../types";
import {
	getChannelList,
	createChannel,
	joinChannel,
	leaveChannel,
	deleteChannel,
	removeParticipant,
	getChannelMessages,
} from "../action/channel.action";

interface IChannelState {
	channelList: IChannel[];
	channelListLoading: boolean;
	channelListError: string;

	createChannelSuccess: IChannel | null;
	createChannelLoading: boolean;
	createChannelError: string;

	joinChannelSuccess: IChannel | null;
	joinChannelLoading: boolean;
	joinChannelError: string;

	leaveChannelSuccess: boolean;
	leaveChannelLoading: boolean;
	leaveChannelError: string;

	deleteChannelSuccess: boolean;
	deleteChannelLoading: boolean;
	deleteChannelError: string;

	removeParticipantSuccess: boolean;
	removeParticipantLoading: boolean;
	removeParticipantError: string;

	channelMessages: IMessage[];
	channelMessagesLoading: boolean;
	channelMessagesError: string;
}

const INIT_STATE: IChannelState = {
	channelList: [],
	channelListLoading: false,
	channelListError: "",

	createChannelSuccess: null,
	createChannelLoading: false,
	createChannelError: "",

	joinChannelSuccess: null,
	joinChannelLoading: false,
	joinChannelError: "",

	leaveChannelSuccess: false,
	leaveChannelLoading: false,
	leaveChannelError: "",

	deleteChannelSuccess: false,
	deleteChannelLoading: false,
	deleteChannelError: "",

	removeParticipantSuccess: false,
	removeParticipantLoading: false,
	removeParticipantError: "",

	channelMessages: [],
	channelMessagesLoading: false,
	channelMessagesError: "",
};

const channelSlice = createSlice({
	name: "channel",
	initialState: INIT_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getChannelList.pending, (state) => {
				state.channelListLoading = true;
				state.channelListError = "";
			})
			.addCase(getChannelList.fulfilled, (state, { payload }) => {
				state.channelList = payload;
				state.channelListLoading = false;
			})
			.addCase(getChannelList.rejected, (state, action) => {
				state.channelListLoading = false;
				state.channelListError = action.error.message!;
			})

			.addCase(createChannel.pending, (state) => {
				state.createChannelLoading = true;
				state.createChannelError = "";
				state.createChannelSuccess = null;
			})
			.addCase(createChannel.fulfilled, (state, { payload }) => {
				state.createChannelSuccess = payload;
				state.createChannelLoading = false;
				state.channelList.push(payload);
			})
			.addCase(createChannel.rejected, (state, action) => {
				state.createChannelLoading = false;
				state.createChannelError = action.error.message!;
				state.createChannelSuccess = null;
			})

			.addCase(joinChannel.pending, (state) => {
				state.joinChannelLoading = true;
				state.joinChannelError = "";
				state.joinChannelSuccess = null;
			})
			.addCase(joinChannel.fulfilled, (state, { payload }) => {
				state.joinChannelSuccess = payload;
				state.joinChannelLoading = false;
			})
			.addCase(joinChannel.rejected, (state, action) => {
				state.joinChannelLoading = false;
				state.joinChannelError = action.error.message!;
				state.joinChannelSuccess = null;
			})

			.addCase(leaveChannel.pending, (state) => {
				state.leaveChannelLoading = true;
				state.leaveChannelError = "";
				state.leaveChannelSuccess = false;
			})
			.addCase(leaveChannel.fulfilled, (state) => {
				state.leaveChannelSuccess = true;
				state.leaveChannelLoading = false;
			})
			.addCase(leaveChannel.rejected, (state, action) => {
				state.leaveChannelLoading = false;
				state.leaveChannelError = action.error.message!;
				state.leaveChannelSuccess = false;
			})

			.addCase(deleteChannel.pending, (state) => {
				state.deleteChannelLoading = true;
				state.deleteChannelError = "";
				state.deleteChannelSuccess = false;
			})
			.addCase(deleteChannel.fulfilled, (state) => {
				state.deleteChannelSuccess = true;
				state.deleteChannelLoading = false;
			})
			.addCase(deleteChannel.rejected, (state, action) => {
				state.deleteChannelLoading = false;
				state.deleteChannelError = action.error.message!;
				state.deleteChannelSuccess = false;
			})

			.addCase(removeParticipant.pending, (state) => {
				state.removeParticipantLoading = true;
				state.removeParticipantError = "";
				state.removeParticipantSuccess = false;
			})
			.addCase(removeParticipant.fulfilled, (state) => {
				state.removeParticipantSuccess = true;
				state.removeParticipantLoading = false;
			})
			.addCase(removeParticipant.rejected, (state, action) => {
				state.removeParticipantLoading = false;
				state.removeParticipantError = action.error.message!;
				state.removeParticipantSuccess = false;
			})

			.addCase(getChannelMessages.pending, (state) => {
				state.channelMessagesLoading = true;
				state.channelMessagesError = "";
			})
			.addCase(getChannelMessages.fulfilled, (state, { payload }) => {
				state.channelMessages = payload;
				state.channelMessagesLoading = false;
			})
			.addCase(getChannelMessages.rejected, (state, action) => {
				state.channelMessagesLoading = false;
				state.channelMessagesError = action.error.message!;
			});
	},
});

export default channelSlice.reducer;
