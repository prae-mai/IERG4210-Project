import {
	registerUser,
	loginUser,
	logoutUser,
	changePassword,
	getUserBySession,
} from "../services/authService.js";
import {
	validateUsername,
	validatePassword,
	validateEmail
} from "../utils/validators.js";

const COOKIE_NAME = "auth_token";

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	path: "/",
};

export async function register(req, res) {
	try {
		const username = validateUsername(req.body.username);
		const email = validateEmail(req.body.email);
		const password = validatePassword(req.body.password);

		await registerUser(username, email, password);

		res.status(201).json({ message: "User registered" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export async function login(req, res) {
	try {
		const username = validateUsername(req.body.username);
		const password = validatePassword(req.body.password);

		const { sessionId, user } = await loginUser(username, password);

		res.cookie(COOKIE_NAME, sessionId, COOKIE_OPTIONS);

		res.json({
			message: "Login successful",
			user,
		});
	} catch (err) {
		res.status(401).json({
			error: err.code || "LOGIN_FAILED",
			message: err.message,
		})
	}
}

export async function logout(req, res) {
	try {
		const sessionId = req.cookies?.[COOKIE_NAME];

		if (sessionId) {
			await logoutUser(sessionId);
		}

		res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

		res.json({ message: "Logged out" });
	} catch (err) {
		res.status(500).json({ error: "Logout failed" });
	}
}

export async function changePasswordHandler(req, res) {
	try {
		if (!req.user) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		const currentPassword = validatePassword(req.body.currentPassword);
		const newPassword = validatePassword(req.body.newPassword);

		await changePassword(req.user.id, currentPassword, newPassword);

		res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

		res.json({ message: "Password changed. Please login again." });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export async function me(req, res) {
	try {
		if (!req.user) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		res.json({ user: req.user });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch user" });
	}
}