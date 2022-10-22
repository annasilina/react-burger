export type TUser = {
	user: TUserData
}

export type TUserData = {
	name: string;
	email: string;
	password?: string;
}

export type TBun = 'bun' | 'main' | 'sauce';

export type TIngredient = {
	_id: string;
	name: string;
	count: number;
	type: TBun;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	uniqID?: string;
	constructorID?: string;
};

export type TStatus = "done" | "pending" | "created" ;

export type TOrder = {
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: TStatus;
	updatedAt: string;
	_id: string;
}

export type TOrdersData = {
	orders: Array<TOrder>,
	total: number;
	totalToday: number;
}