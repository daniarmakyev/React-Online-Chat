import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<SocketProvider>
			<RouterProvider router={router} />
		</SocketProvider>
	</Provider>,
);
