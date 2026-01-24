export function getImageUrl(path) {
	if (path.startsWith("http")) {
		return path;
	}

	return `/images/${path}`;
}