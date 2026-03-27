import { getUserBySession } from "../services/authService.js";

const COOKIE_NAME = "auth_token";

export async function requireAuth(req, res, next) {
	try {
		const sessionId = req.cookies?.[COOKIE_NAME];

		if (!sessionId) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		const user = await getUserBySession(sessionId);

		if (!user) {
			return res.status(401).json({ error: "Invalid session" });
		}

		req.user = user;

		next();
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Auth validation failed" });
	}
}

export function requireAdmin(req, res, next) {
	if (!req.user) {
		return res.status(500).json({ error: "Auth middleware missing" });
	}

	if (!req.user.isAdmin) {
		return res.status(403).json({ error: "Admin access required" });
	}

	next();
}
