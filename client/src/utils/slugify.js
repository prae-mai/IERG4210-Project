export function slugify(value) {
	if (!value) return "";

	return value
		.toString()
		.normalize("NFD") // handle accented characters
		.replace(/[\u0300-\u036f]/g, "") // remove accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "") // remove non-url-safe chars
		.replace(/\s+/g, "-") // turn spaces to hyphens
		.replace(/-+/g, "-"); // collapse duplicate hyphens
}