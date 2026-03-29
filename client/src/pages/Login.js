import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { userItems } from "../data/userItems";
import { useAuth } from "../utils/useAuth";

function Login() {
	useDocumentTitle("Login");

	const { login } = useAuth();
	const location = useLocation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const params = new URLSearchParams(location.search);
	const loggedOut = params.get("loggedOut");

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");

		try {
			await login(username, password);

			setUsername("");
			setPassword("");
		} catch (err) {
			setError(err.message);

			setPassword("");

			if (err.code === "USER_NOT_FOUND") {
				setError("Username doesn't exist");
			} else if (err.code === "INVALID_PASSWORD") {
				setError("Incorrect password");
			} else {
				setError("Login failed");
			}
		}
	}

	return (
		<div>
			<h1>Login</h1>

			{loggedOut && <p>You have been logged out.</p>}

			<form onSubmit={handleSubmit}>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br></br>

				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br></br>

				<button type="submit">Login</button>
			</form>

			{error && <p>{error}</p>}

			<br></br>
			{userItems.map((item) => (
				<li key={item.path}>
					<NavLink to={item.path} end={item.path === "/"}>
						{item.label}
					</NavLink>
				</li>
			))}
		</div>
	);
}

export default Login;
