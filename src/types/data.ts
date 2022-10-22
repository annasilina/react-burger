export type TUserData = {
	user: {
		name: string;
		email: string;
		password?: string;
	}
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