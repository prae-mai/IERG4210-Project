import { useState } from "react";
import { NavLink } from "react-router-dom";
import { userItems } from "../../data/userItems";

function UserMenu({ user, onLogout }) {
	const [open, setOpen] = useState(false);

	function toggleMenu() {
		setOpen((prev) => !prev);
	}

	function handleLogout() {
		setOpen(false);
		onLogout();
	}

	return (
		<div className="user-menu">
			<button
				onClick={toggleMenu}
				aria-haspopup="true"
				aria-expanded={open}
			>
				{user.username}
			</button>

			{open && (
				<ul className="user-menu-dropdown">
					{userItems.map((item) => (
						<li key={item.path}>
							<NavLink to={item.path} end={item.path === "/"}>
								{item.label}
							</NavLink>
						</li>
					))}
					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				</ul>
			)}
		</div>
	);
}

export default UserMenu;