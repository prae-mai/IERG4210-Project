import { StrictMode } from "react";
import { AuthProvider } from "./utils/useAuth";

import ReactDOM from "react-dom/client"
import "./styles.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>,
);
