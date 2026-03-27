import { useDocumentTitle } from "../utils/useDocumentTitle";
import { useState } from "react";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

import * as authApi from "../api/authApi";

function PasswordReset() {
	useDocumentTitle("Password Reset");

	const { user, logout, loading } = useAuth();
	const navigate = useNavigate();

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return (
			<div>
				<h1>Password Reset</h1>
				You need to be logged in to reset your password.
				<br></br>
				<br></br>
				<NavLink to="/login">Go to Login page</NavLink>
			</div>
		);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (newPassword !== confirmPassword) {
			setError("New passwords do not match");
			return;
		}

		try {
			await authApi.changePassword(currentPassword, newPassword);

			setSuccess("Password changed. Logging out...");

			// ensure frontend state clears
			await logout();

			navigate("/login");
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<div>
			<h1>Password Reset</h1>

			<form onSubmit={handleSubmit}>
				<label>
					Current Password
					<input
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</label>
				<br></br>

				<label>
					New Password
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</label>
				<br></br>

				<label>
					Confirm New Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				<br></br>

				<button type="submit">Change Password</button>
			</form>

			{error && <p>{error}</p>}
			{success && <p>{success}</p>}
		</div>
	);
}

export default PasswordReset;