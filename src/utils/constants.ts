import {TErrors} from "../types/TErrors";
import {TLinks} from "../types/TLinks";

export const links: TLinks = {
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

export const errors: TErrors = {
	userExists: 'User already exists',
	incorrectValues: 'email or password are incorrect',
	incorrectToken: ['jwt malformed'],
};