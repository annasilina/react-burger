import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

function Tabs() {
	const [current, setCurrent] = React.useState('one')

	return (
		<div style={{ display: 'flex' }}>
			<Tab value="one" active={current === 'one'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value="two" active={current === 'two'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="three" active={current === 'three'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	)
}

function BurgerIngredients() {
	return (
		<article className={burgerIngredientsStyles.ingredients}>
			<Tabs />
			<ul className={burgerIngredientsStyles.ingredientsList}>
				<li className={burgerIngredientsStyles.ingredientsItem}>
					<h2 className="text text_type_main-medium pt-">Булки</h2>
				</li>
				<li className={burgerIngredientsStyles.ingredientsItem}>
					<h2 className="text text_type_main-medium">Соусы</h2>
				</li>
				<li className={burgerIngredientsStyles.ingredientsItem}>
					<h2 className="text text_type_main-medium">Начинки</h2>
				</li>
			</ul>
		</article>
	)
}

export default BurgerIngredients;