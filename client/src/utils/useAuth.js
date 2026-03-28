import { createContext, useContext, useState, useEffect } from "react";
import { AUTH_BASE_URL } from "../config/apiConfig";
import * as authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const res = await fetch(`${AUTH_BASE_URL}/me`, {
					credentials: "include",
				});

				if (!res.ok) {
					setUser(null);
					return;
				}

				const data = await res.json();
				setUser(data.user);
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		}

		fetchUser();
	}, []);

	async function login(username, password) {
		const data = await authApi.login(username, password);
		setUser(data.user);
	}

	async function logout() {
		await authApi.logout();
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}
