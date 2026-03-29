export function normalizeUserInput(raw) {
	return {
		username: raw.username?.trim() || "",
		email: raw.email?.trim() || "",
		password: raw.password || "",
	};
}

export function validateUserInput(user) {
	const errors = {};

	if (!user.username) {
		errors.username = "Username is required";
	}

	if (
		user.username &&
		(user.username.length < 3 || user.username.length > 20)
	) {
		errors.username = "Username must be between 3 and 20 characters";
	}

	if (!user.email) {
		errors.email = "Email is required";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
		errors.email = "Invalid email format";
	}

	if (!user.password) {
		errors.password = "Password is required";
	} else if (user.password.length < 8) {
		errors.password = "Password must be at least 8 characters";
	}

	return errors;
}
