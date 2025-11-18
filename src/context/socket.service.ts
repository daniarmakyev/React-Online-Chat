import { io, Socket } from "socket.io-client";
import type { IMessage } from "../types";

class SocketService {
	private socket: Socket | null = null;
	private readonly serverUrl: string;

	constructor() {
		this.serverUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3012";
	}

	connect(token: string): void {
		if (this.socket?.connected) {
			console.log("Socket already connected");
			return;
		}

		this.socket = io(this.serverUrl, {
			auth: {
				token,
			},
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionAttempts: 5,
		});

		this.socket.on("connect", () => {
			console.log("Socket connected:", this.socket?.id);
		});

		this.socket.on("disconnect", (reason) => {
			console.log("Socket disconnected:", reason);
		});

		this.socket.on("error", (error: { message: string }) => {
			console.error("Socket error:", error.message);
		});

		this.socket.on("connect_error", (error) => {
			console.error("Connection error:", error.message);
		});
	}

	disconnect(): void {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}

	joinChannel(channelId: string): void {
		if (!this.socket?.connected) {
			console.error("Socket not connected");
			return;
		}
		console.log("Joining channel:", channelId);
		this.socket.emit("join_channel", channelId);
	}

	leaveChannel(channelId: string): void {
		if (!this.socket?.connected) {
			console.error("Socket not connected");
			return;
		}
		console.log("Leaving channel:", channelId);
		this.socket.emit("leave_channel", channelId);
	}

	sendMessage(channelId: string, text: string): void {
		if (!this.socket?.connected) {
			console.error("Socket not connected");
			return;
		}
		this.socket.emit("send_message", { channelId, text });
	}

	// Event listeners for socket connection state
	onSocketConnect(callback: () => void): void {
		if (!this.socket) {
			console.error("Socket not initialized");
			return;
		}
		this.socket.on("connect", callback);
	}

	onSocketDisconnect(callback: () => void): void {
		if (!this.socket) {
			console.error("Socket not initialized");
			return;
		}
		this.socket.on("disconnect", callback);
	}

	onNewMessage(callback: (data: { message: IMessage }) => void): void {
		if (!this.socket) {
			console.error("Socket not initialized");
			return;
		}
		this.socket.on("new_message", callback);
	}

	onJoinedChannel(callback: (data: { channelId: string }) => void): void {
		if (!this.socket) {
			console.error("Socket not initialized");
			return;
		}
		this.socket.on("joined_channel", callback);
	}

	onUserJoinedChannel(
		callback: (data: { userId: string; channelId: string }) => void,
	): void {
		if (!this.socket) {
			console.error("Socket not initialized");
			return;
		}
		this.socket.on("user_joined_channel", callback);
	}

	onUserLeftChannel(
		callback: (data: { userId: string; channelId: string }) => void,
	): void {
		if (!this.socket) {
			console.error("Socket not initialized");
			return;
		}
		this.socket.on("user_left_channel", callback);
	}

	removeListener(event: string): void {
		if (!this.socket) {
			return;
		}
		this.socket.off(event);
	}

	removeAllListeners(): void {
		if (!this.socket) {
			return;
		}
		this.socket.removeAllListeners();
	}

	isConnected(): boolean {
		return this.socket?.connected ?? false;
	}
}

export const socketService = new SocketService();
