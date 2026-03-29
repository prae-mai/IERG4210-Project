import { NavLink } from "react-router-dom";
import { navItems } from "../../data/navItems";
import { useAuth } from "../../utils/useAuth";

import UserMenu from "./UserMenu";

function Navbar() {
	const { user, logout } = useAuth();

	return (
		<nav className="site-nav">
			<ul className="nav-list">
				{navItems.map((item) => (
					<li key={item.path}>
						<NavLink to={item.path} end={item.path === "/"}>
							{item.label}
						</NavLink>
					</li>
				))}

				{user?.isAdmin && (
					<li>
						<NavLink to="/admin">Admin</NavLink>
					</li>
				)}

				<li>
					<NavLink to="/login">Login</NavLink>
				</li>

				{user ? (
					<li>
						<UserMenu user={user} onLogout={logout} />
					</li>
				) : (
					"You are a guest"
				)}
			</ul>
		</nav>
	);
}

export default Navbar;