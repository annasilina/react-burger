// доделать типизацию параметра после типизации данных заказа в ответе от бэка
export const getOrderStatus = (orderStatus: string): string => {
	switch (orderStatus) {
		case 'done': {
			return 'Выполнен'
		}
		case 'pending': {
			return 'Готовится'
		}
		case 'created': {
			return 'Создан'
		}
		default:
			return '';
	}
}