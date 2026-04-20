import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import { useDocumentTitle } from "../utils/useDocumentTitle";

import { getProducts, getProductById } from "../api/productsApi";
import { PRODUCT_DETAIL_STATUS } from "../config/productStatus";
import { slugify } from "../utils/slugify";

import ProductItem from "../components/products/public/ProductItem";
import ProductCategoryNav from "../components/navigation/ProductCategoryNav";

import ENGLISH from "../i18n/english";

function Products() {
	useDocumentTitle("Products");

	// Get category and productID from URL
	const { category, productId } = useParams();

	const [products, setProducts] = useState([]);
	const [productsLoaded, setProductsLoaded] = useState(false);

	const [detailProduct, setDetailProduct] = useState(null);
	const [detailStatus, setDetailStatus] = useState(PRODUCT_DETAIL_STATUS.IDLE);

	const isDetailView = Boolean(category && productId);

	// Extract numeric ID from "pid-productname"
	const parsedProductId = productId
		? parseInt(productId.split("-")[0], 10)
		: null;

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

	useEffect(() => {
		if (!isDetailView || !parsedProductId) return;

		// try to find in cached products
		const cached = products.find((p) => p.id === parsedProductId);

		if (cached) {
			setDetailProduct(cached);
			setDetailStatus(PRODUCT_DETAIL_STATUS.SUCCESS);
			return;
		}

		// if not cached, fetch individually
		async function fetchSingle() {
			setDetailStatus(PRODUCT_DETAIL_STATUS.LOADING);
			try {
				const product = await getProductById(parsedProductId);

				if (!product) {
					setDetailStatus(PRODUCT_DETAIL_STATUS.NOT_FOUND);
					return;
				}
				setDetailProduct(product);
				setDetailStatus(PRODUCT_DETAIL_STATUS.SUCCESS);
			} catch (err) {
				console.error(err);
				setDetailStatus(PRODUCT_DETAIL_STATUS.ERROR);
			}
		}

		fetchSingle();
	}, [isDetailView, parsedProductId, products]);

	const productsToRender = useMemo(() => {
		if (!category || category.toLowerCase() === "all") {
			return products;
		}

		return products.filter(
			(p) => p.categoryName?.toLowerCase() === category.toLowerCase(),
		);
	}, [products, category]);

	if (isDetailView) {
		if (detailStatus === PRODUCT_DETAIL_STATUS.NOT_FOUND) {
			return <h2>{ENGLISH.PRODUCT.NOT_FOUND}</h2>;
		}

		if (detailStatus === PRODUCT_DETAIL_STATUS.ERROR) {
			return <h2>Something went wrong.</h2>;
		}

		if (!detailProduct) {
			// keep previous content until resolved for no flickering
			return null;
		}

		return (
			<section className="products-page">
				<ProductCategoryNav />
				<div className="products-content">
					<section>
						<ProductItem product={detailProduct} view="detail" />
					</section>
				</div>
			</section>
		);
	}

	return (
		<section className="products-page">
			<ProductCategoryNav />
			<div className="products-content">
				<section>
					<h1>
						{category && category !== "all"
							? category.charAt(0).toUpperCase() +
								category.slice(1)
							: "All Products"}
					</h1>

					<div className="product-grid">
						{productsToRender.map((product) => {
							const slug = slugify(product.name);

							return (
								<Link
									key={product.id}
									to={`/products/${product.categoryName.toLowerCase()}/${product.id}-${slug}`}
								>
									<ProductItem
										product={product}
										view="grid"
									/>
								</Link>
							);
						})}
					</div>
				</section>
			</div>
		</section>
	);
}

export default Products;