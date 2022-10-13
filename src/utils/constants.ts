interface ILinks {
	home: string;
	profile: string;
	login: string;
	register: string;
	forgotPassword: string;
	resetPassword: string;
	ingredients: string;
	ingredient: string;
	feedOrders: string;
	feedOrderInfo: string;
	profileOrders: string;
	profileOrderInfo: string;
}

interface IErrors {
	userExists: string;
	incorrectValues: string;
	incorrectToken: Array<string>
}

export const links: ILinks = {
	home: '/',
	profile: '/profile/',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
	ingredients: '/ingredients',
	ingredient: '/ingredients/:id',
	feedOrders: '/feed',
	feedOrderInfo: '/feed/:id',
	profileOrders: '/profile/orders',
	profileOrderInfo: '/profile/orders/:id',
};

export const errors: IErrors = {
	userExists: 'User already exists',
	incorrectValues: 'email or password are incorrect',
	incorrectToken: ['jwt malformed'],
};