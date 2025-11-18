import { useEffect, useState, useCallback, type ReactNode } from "react";
import { socketService } from "./socket.service";
import { SocketContext } from "./soket";

export interface SocketContextType {
	isConnected: boolean;
	connect: () => void;
	disconnect: () => void;
}

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
	const [isConnected, setIsConnected] = useState(false);

	const connect = useCallback(() => {
		const token = localStorage.getItem("token");
		if (token && !socketService.isConnected()) {
			socketService.connect(token);
		}
	}, []);

	const disconnect = useCallback(() => {
		socketService.disconnect();
		setIsConnected(false);
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			socketService.connect(token);

			const handleConnect = () => {
				setIsConnected(true);
			};

			const handleDisconnect = () => {
				setIsConnected(false);
			};

			socketService.onSocketConnect(handleConnect);
			socketService.onSocketDisconnect(handleDisconnect);

			if (socketService.isConnected()) {
				setTimeout(() => setIsConnected(true), 0);
			}

			return () => {
				socketService.removeListener("connect");
				socketService.removeListener("disconnect");
				socketService.disconnect();
			};
		}
	}, []);

	return (
		<SocketContext.Provider value={{ isConnected, connect, disconnect }}>
			{children}
		</SocketContext.Provider>
	);
};
