import { createContext, useContext } from "react";
import { type SocketContextType } from "./SocketContext";

export const SocketContext = createContext<SocketContextType | undefined>(
	undefined,
);

export const useSocket = (): SocketContextType => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error("useSocket must be used within SocketProvider");
	}
	return context;
};
