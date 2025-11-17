import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChannelLists from "../pages/ChannelsList";

export const router = createBrowserRouter([
	{
		id: "root",
		//   errorElement: <ErrorPage />,
		element: <Layout />,
		children: [
			{ path: "/", element: <LoginPage /> },
			{ path: "/signup", element: <RegisterPage /> },
			{ path: "/channels", element: <ChannelLists /> },
		],
	},
]);
