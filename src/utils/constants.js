export const links = {
	home: '/',
	profile: '/profile',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
	ingredients: '/ingredients',
	ingredient: '/ingredients/:id',
	ordersFeed: '/feed',
	order: '/feed/:id',
	userOrdersHistory: '/profile/orders',
	userOrder: '/profile/orders/:id',
};

export const errors = {
	userExists: 'User already exists',
	incorrectValues: 'email or password are incorrect',
	incorrectToken: ['jwt malformed'],
};


// тестовые данные для верстки ленты заказов
// тестовый объект ответа ленты заказов
export const ordersFeed = {
	success: true,
	orders: [
		{
			ingredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733cc',
				'60d3b41abdacab0026a733d1',
				'60d3b41abdacab0026a733cb',
			],
			_id: "1",
			status: "done",
			number: "35444",
			createdAt: "2022-09-24T09:43:22.587Z",
			updatedAt: "2022-09-24T09:43:22.603Z"
		},
		{
			ingredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d1',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733cb',
			],
			_id: "2",
			status: "pending",
			number: "35445",
			createdAt: "2022-09-23T14:44:22.587Z",
			updatedAt: "2022-09-23T14:44:22.603Z"
		},
		{
			ingredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733d1',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d2',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733cb',
			],
			_id: "3",
			status: "done",
			number: "35446",
			createdAt: "2022-09-22T14:45:22.587Z",
			updatedAt: "2022-09-22T14:45:22.603Z"
		},
		{
			ingredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733d1',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d2',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733cb',
			],
			_id: "4",
			status: "done",
			number: "35447",
			createdAt: "2022-09-21T13:46:22.587Z",
			updatedAt: "2022-09-21T13:46:22.603Z"
		},
		{
			ingredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733d4',
				'60d3b41abdacab0026a733d2',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733d3',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d2',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733cb',
			],
			_id: "5",
			status: "done",
			number: "35448",
			createdAt: "2022-09-20T12:47:22.587Z",
			updatedAt: "2022-09-20T12:47:22.603Z"
		},
		{
			ingredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733d3',
				'60d3b41abdacab0026a733d4',
				'60d3b41abdacab0026a733cc',
				'60d3b41abdacab0026a733d0',
				'60d3b41abdacab0026a733d3',
			],
			_id: "6",
			status: "pending",
			number: "35449",
			createdAt: "2022-09-19T14:48:22.587Z",
			updatedAt: "2022-09-19T14:48:22.603Z"
		},
	],
	total: 28752,
	totalToday: 6
}

// тестовый объект для сборки экрана готовности заказов
export const ordersBoard = {
	orders_done: [35448, 35445, 35446, 35447, 35448, 35449, 35448, 35445, 35446, 35447, 35448, 35449],
	orders_pending: [35445, 35449],
	total_orders: [28752],
	total_today_orders: [6]
}

