import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../../api/productsApi";

function titleCase(str) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function HierarchicalNav() {
	const separator = " > ";
	const className = "hierarchical-nav";
	const location = useLocation();

	const [products, setProducts] = useState([]);
	const [productsLoaded, setProductsLoaded] = useState(false);

	useEffect(() => {
		if (productsLoaded) return;

		async function fetchAll() {
			try {
				const data = await getProducts();
				setProducts(data);
				setProductsLoaded(true);
			} catch (err) {
				console.error(err);
			}
		}

		fetchAll();
	}, [productsLoaded]);

	const productList = products;

	const pathname = location.pathname;
	const segments = pathname
		.split("?")[0]
		.split("#")[0]
		.split("/")
		.filter(Boolean)
		.map((segment) => decodeURIComponent(segment));

	if (segments.length === 0) {
		return null;
	}

	const crumbs = [];
	let accumulatedPath = "";

	segments.forEach((segment, index) => {
		accumulatedPath += `/${segment}`;
		const isLast = index === segments.length - 1;

		let label = titleCase(segment);

		// resolve productID to product name
		const product = productList.find((p) => p.id === segment);
		if (product) {
			label = product.name;
		}

		crumbs.push({
			label,
			to: isLast ? null : accumulatedPath,
		});
	});

	return (
		<nav className={className} aria-label="Breadcrumb">
			<ul className="nav-list">
				{crumbs.map((crumb, index) => (
					<li key={index}>
						{crumb.to ? (
							<Link to={crumb.to}>{crumb.label}</Link>
						) : (
							<span>{crumb.label}</span>
						)}
						{index < crumbs.length - 1 && (
							<span className="separator">{separator}</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}

export default HierarchicalNav;