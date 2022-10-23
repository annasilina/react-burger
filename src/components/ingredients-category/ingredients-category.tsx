import React, {forwardRef} from 'react';

import styles from './ingredients-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import {TIngredient, TIngredientType} from "../../types/data";

type Ref = HTMLDivElement;

interface IIngredientsCategoryProps {
	title: string;
	ingredients: Array<TIngredient>;
	type: TIngredientType;
	ref?: Ref;
}

const IngredientsCategory = forwardRef<Ref, IIngredientsCategoryProps>(
	({title, ingredients, type}, ref) => {
		return (
			<div ref={ref}>
				<h2 className='text text_type_main-medium' id={type}>
					{title}
				</h2>
				<ul className={`${styles.typeList} mt-6 mr-2 mb-10 ml-4`}>
					{ingredients.map((ingredient) => (
						<BurgerIngredient key={ingredient._id} ingredient={ingredient}/>
					))}
				</ul>
			</div>
		);
	}
);

export default IngredientsCategory;
