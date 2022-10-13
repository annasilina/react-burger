export const getFormatDate = (dateString: string): string => {
	try {
		const dateData = new Date(Date.parse(dateString));
		const dateTime = dateData.toLocaleTimeString().slice(0, 5);
		const dateTimeZone = dateData.getTimezoneOffset() / -60;

		const todayData = new Date().setHours(24);

		const diff = Math.floor((todayData.valueOf() - dateData.valueOf()) / (1000 * 60 * 60 * 24));

		let weekDay: string;

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
	} catch (e) {
		return '';
	}
}