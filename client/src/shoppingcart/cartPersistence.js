const STORAGE_KEY = "shoppingCart";

export function loadCartState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;

		const parsed = JSON.parse(raw);
		
		if (
			typeof parsed !== "object" ||
			!Array.isArray(parsed.items) ||
			typeof parsed.isCheckoutLocked !== "boolean"
		) {
			return null;
		}

		return parsed;
	} catch {
		return null;
	}
}

export function saveCartState(state) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// silently ignore (e.g. storage full)
	}
}

export function clearCartState() {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// ignore
	}
}
