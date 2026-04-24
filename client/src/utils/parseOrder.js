export function parseCartContent(cartcontent) {
	if (!cartcontent) {
		return {
			pids: "",
			quantities: "",
			prices: "",
		};
	}

	let items;

	try {
		items = JSON.parse(cartcontent);
	} catch {
		return {
			pids: "Invalid data",
			quantities: "Invalid data",
			prices: "Invalid data",
		};
	}

	if (!Array.isArray(items)) {
		return {
			pids: "Invalid data",
			quantities: "Invalid data",
			prices: "Invalid data",
		};
	}

	const pids = [];
	const quantities = [];
	const prices = [];

	for (const item of items) {
		pids.push(Number.isInteger(item.pid) ? item.pid : "");
		quantities.push(Number.isInteger(item.quantity) ? item.quantity : "");
		prices.push(typeof item.price === "number" ? item.price.toFixed(2): "");
	}

	return {
		pids: pids.join(", "),
		quantities: quantities.join(", "),
		prices: prices.join(", "),
	};
}
