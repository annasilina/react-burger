import {TOrderStatus} from "../types/data";

export const getOrderStatus = (orderStatus: TOrderStatus): string => {
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
	}
}