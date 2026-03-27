import { useDocumentTitle } from "../utils/useDocumentTitle";
import { useState } from "react";
import * as authApi from "../api/authApi";

function Registration() {
	useDocumentTitle("Registration");

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (password !== confirm) {
			setError("Passwords do not match");
			return;
		}

		try {
			await authApi.register(username, password);
			setSuccess("Registration successful. You can now login.");
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<div>
			<p>Registration page, under construction</p>
			<h1>Registration</h1>

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

				<label>
					Confirm Password
					<input
						type="password"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
					/>
				</label>
				<br></br>

				<button type="submit">Register</button>
			</form>

			{error && <p>{error}</p>}
			{success && <p>{success}</p>}
		</div>
	);
}

export default Registration;