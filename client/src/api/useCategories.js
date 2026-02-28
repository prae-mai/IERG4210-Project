import { useEffect, useState } from "react";
import { getCategories } from "./categoriesApi";

export default function useCategories() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function load() {
			try {
				const data = await getCategories();

				// map API model -> view model
				const mapped = data.map((c) => ({
					id: c.id,
					name: c.name,
					slug: c.name.toLowerCase(), // URL segment
				}));

				setCategories(mapped);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	return { categories, loading, error };
}
