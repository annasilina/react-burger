export const calcOrderCost = (bun, other) => {
	let bunCost;

	if (typeof bun !== "object") {
		bun = {};
	}

	if (!Array.isArray(other)) {
		other = [];
	}

	Object.keys(bun).length === 0 ? (bunCost = 0) : (bunCost = bun.price * 2);
	const otherCost = other.length === 0
		? 0
		: other.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

	return bunCost + otherCost;
};