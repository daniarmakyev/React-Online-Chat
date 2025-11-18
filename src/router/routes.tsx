import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChannelPage from "../pages/ChannelsPage";
import ChatWindow from "../components/chat/ChatWindow";

export const router = createBrowserRouter([
	{
		id: "root",
		//   errorElement: <ErrorPage />,
		element: <Layout />,
		children: [
			{ path: "/", element: <LoginPage /> },
			{ path: "/signup", element: <RegisterPage /> },
			{ path: "/channels", element: <ChannelPage /> },
			{ path: "/chat/:id", element: <ChatWindow /> },
		],
	},
]);
