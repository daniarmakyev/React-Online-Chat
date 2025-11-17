import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
	{
		id: "root",
		//   errorElement: <ErrorPage />,
		element: <Layout />,
		children: [{ path: "/", element: <LoginPage /> }],
	},
]);
