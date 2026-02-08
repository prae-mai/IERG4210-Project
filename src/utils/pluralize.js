export function pluralize(count, singular, plural) {
	if (count === 1 || count === -1) {
		return `${count} ${singular}`;
	}

	return `${count} ${plural}`;
}