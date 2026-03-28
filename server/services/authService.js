import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { dbQuery } from "../utils/dbQuery.js";

const SALT_ROUNDS = 10;

export async function registerUser(username, password) {
	// check if user exists
	const existing = await dbQuery("SELECT id FROM users WHERE username = ?", [
		username,
	]);

	if (existing.length > 0) {
		throw new Error("Username already exists");
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	await dbQuery(
		`INSERT INTO users (username, password, isadmin) VALUES (?, ?, FALSE)`,
		[username, hashedPassword],
	);
}

export async function loginUser(username, password) {
	const users = await dbQuery(
		"SELECT id, password, isadmin FROM users WHERE username = ?",
		[username],
	);

	if (users.length === 0) {
		const err = new Error("User not found");
		err.code = "USER_NOT_FOUND";
		throw err;
	}

	const user = users[0];
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		const err = new Error("Invalid password");
		err.code = "INVALID_PASSWORD";
		throw err;
	}

	// rotate session ID (prevents session fixation)
	const sessionId = uuidv4();

	await dbQuery("UPDATE users SET sessionid = ? WHERE id = ?", [
		sessionId,
		user.id,
	]);

	return {
		sessionId,
		user: {
			id: user.id,
			username,
			isAdmin: !!user.isadmin,
		},
	};
}

export async function logoutUser(sessionId) {
	await dbQuery("UPDATE users SET sessionid = NULL WHERE sessionid = ?", [
		sessionId,
	]);
}

export async function getUserBySession(sessionId) {
	const users = await dbQuery(
		"SELECT id, username, isadmin FROM users WHERE sessionid = ?",
		[sessionId],
	);

	if (users.length === 0) return null;

	const user = users[0];

	return {
		id: user.id,
		username: user.username,
		isAdmin: !!user.isadmin,
	};
}

export async function changePassword(userId, currentPassword, newPassword) {
	const users = await dbQuery("SELECT password FROM users WHERE id = ?", [
		userId,
	]);

	if (users.length === 0) {
		throw new Error("User not found");
	}

	const user = users[0];

	const match = await bcrypt.compare(currentPassword, user.password);

	if (!match) {
		throw new Error("Incorrect password");
	}

	const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

	await dbQuery(
		"UPDATE users SET password = ?, sessionid = NULL WHERE id = ?",
		[hashedPassword, userId],
	);
}
