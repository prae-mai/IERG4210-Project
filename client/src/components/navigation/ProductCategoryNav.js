import { NavLink } from "react-router-dom";

import useCategories from "../../api/useCategories";

function ProductCategoryNav() {
	const { categories, loading, error } = useCategories();

	if (loading) return null;
	if (error) return <p>Failed to load categories</p>;

	// synthetic "all" for frontend only
	const navCategories = [
		{ id: "all", name: "All", slug: "all" },
		...categories,
	];

	return (
		<nav className="product-category-nav" aria-label="Product categories">
			<ul className="product-category-nav__list">
				{navCategories.map((category) => (
					<li key={category.id}>
						<NavLink
							to={`/products/${category.slug}`}
							end={category.slug === "all"}
							className={({ isActive }) =>
								isActive ? "active" : undefined
							}
						>
							{category.name}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default ProductCategoryNav;