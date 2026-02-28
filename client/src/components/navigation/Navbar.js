import { NavLink } from "react-router-dom";
import { navItems } from "../../data/navItems";

function Navbar() {
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
			</ul>
		</nav>
	);
}

export default Navbar;