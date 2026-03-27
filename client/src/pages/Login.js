import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { userItems } from "../data/userItems";
import { use, useState } from "react";
import { useAuth } from "../utils/useAuth";

function Login() {
	useDocumentTitle("Login");

	const { login } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");

		try {
			await login(username, password);
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<div>
			<h1>Login</h1>

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