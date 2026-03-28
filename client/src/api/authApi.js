import { AUTH_BASE_URL } from "../config/apiConfig";

async function request(path, options = {}) {
	const res = await fetch(`${AUTH_BASE_URL}${path}`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	});

	let data;
	try {
		data = await res.json();
	} catch {
		throw new Error("Invalid server response");
	}

	if (!res.ok) {
		const err = new Error(data.message || "Request failed");
		err.code = data.error;
		throw err;
	}

	return data;
}

export function login(username, password) {
	return request("/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
}

export function register(username, password) {
	return request("/register", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
}

export function logout() {
	return request("/logout", {
		method: "POST",
	});
}

export function changePassword(currentPassword, newPassword) {
	return request("/change-password", {
		method: "POST",
		body: JSON.stringify({ currentPassword, newPassword }),
	});
}
