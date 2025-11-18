import React from "react";
import { useParams } from "react-router-dom";

// interface ChatWindowProps {
// 	id: string;
// }

const ChatWindow = () => {
	const { id } = useParams();
	return <div>{id}</div>;
};

export default ChatWindow;
