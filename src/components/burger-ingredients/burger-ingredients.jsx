import React from 'react';

import {useState} from 'react';

import styles from './burger-ingredients.module.css';

import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsCategory({ type, title, ingredients }) {
	return (
		<div>
			<h2 className="text text_type_main-medium">
				{title}
			</h2>
			<ul className={`${styles.typeList} mt-6 mr-2 mb-10 ml-4`} key={type}>
				{ingredients.map((ingredient) =>
					<BurgerIngredient key={ingredient._id} ingredient={ingredient} />)
				}
			</ul>
		</div>
	)
}

function BurgerIngredient({ ingredient }) {
	const count = Math.floor(Math.random() * 2);

	return (
		<li className={`${styles.ingredientsItem}`}>
			<img src={ingredient.image} alt={ingredient.name} className="pr-4 pl-4"/>
			{count > 0 && <Counter count={count} size={'default'} />}
			<div className={`${styles.ingredientCurrency} mb-1 mt-1`}>
				<p className="text text_type_digits-default mr-2">{ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${styles.ingredientsCaption} text text_type_main-default pt-1`}>
				{ingredient.name}
			</p>
		</li>
	)
}

function BurgerIngredients(props) {
	const [current, setCurrent] = useState('bun');
	const ingredientsTypeBun = props.ingredients.filter((ingredient) => ingredient.type === 'bun');
	const ingredientsTypeMain = props.ingredients.filter((ingredient) => ingredient.type === 'main');
	const ingredientsTypeSauce = props.ingredients.filter((ingredient) => ingredient.type === 'sauce');

	return (
		<section>
			<h1 className="text text_type_main-large pt-10 pb-5">
				Соберите бургер
			</h1>
			<div className={`${styles.ingredientsTabs} mb-10`}>
				<Tab
					value="bun"
					active={current === 'bun'}
					onClick={setCurrent}>
					Булки
				</Tab>
				<Tab
					value="sauce"
					active={current === 'sauce'}
					onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab
					value="main"
					active={current === 'main'}
					onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={styles.ingredientsContainer}>
				<IngredientsCategory
					type="bun"
					title='Булки'
					ingredients={ingredientsTypeBun}
				/>
				<IngredientsCategory
					type="main"
					title='Начинки'
					ingredients={ingredientsTypeMain}
				/>
				<IngredientsCategory
					type="sauce"
					title='Соусы'
					ingredients={ingredientsTypeSauce}/>
			</div>
		</section>
	)
}

export default BurgerIngredients;