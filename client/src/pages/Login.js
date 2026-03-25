import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { userItems } from "../data/userItems";

function Login() {
	useDocumentTitle("Login");

	return (
		<div>
			<p>Login page, under construction</p>

			{userItems.map((item) => (
				<li key={item.path}>
					<NavLink to={item.path} end={item.path === "/"}>
						{item.label}
					</NavLink>
				</li>
			))}
		</div>
	);
}

export default Login;