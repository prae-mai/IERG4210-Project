import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { adminItems } from "../data/adminItems";

function Admin() {
	useDocumentTitle("Admin");

	return (
		<div>
			<p>Welcome to the admin page.</p>

			{adminItems.map((item) => (
					<li key={item.path}>
						<NavLink to={item.path} end={item.path === "/"}>
							{item.label}
						</NavLink>
					</li>
				))}

		</div>
	);
}

export default Admin;
