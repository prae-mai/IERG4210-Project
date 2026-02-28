import { NavLink } from "react-router-dom";
import { PRODUCT_CATEGORY_LIST } from "../../config/productCategories";

function ProductCategoryNav() {
	const navCategories = PRODUCT_CATEGORY_LIST;

	return (
		<nav className="product-category-nav" aria-label="Product categories">
			<ul className="product-category-nav__list">
				{navCategories.map((category) => (
					<li key={category}>
						<NavLink
							to={`/products/${category}`}
							end={category === "all"}
							className={({ isActive }) =>
								isActive ? "active" : undefined
							}
						>
							{category.charAt(0).toUpperCase() +
								category.slice(1)}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default ProductCategoryNav;