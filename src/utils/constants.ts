import {IErrors} from "../types/IErrors";
import {ILinks} from "../types/ILinks";

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