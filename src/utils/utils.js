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

export const getFormatDate = (dateString) => {
	const dateData = new Date(Date.parse(dateString));
	const dateTime = dateData.toLocaleTimeString().slice(0, 5);
	const dateTimeZone = dateData.getTimezoneOffset() / -60;

	const todayData = new Date().setHours(24);

	const diff = Math.floor((todayData - dateData) / (1000 * 60 * 60 * 24));

	let weekDay;

	if (diff === 0) {
		weekDay = 'Сегодня'
	} else if (diff === 1) {
		weekDay = 'Вчера'
	} else if (diff < 4) {
		weekDay = `${diff} дня назад`
	} else {
		weekDay = `${dateData.toLocaleDateString().split('/').join('.')}`
	}

	return `${weekDay}, ${dateTime} i-GMT+${dateTimeZone}`;
}