import React from 'react';
import {useState} from 'react';

import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import {ingredientPropTypes} from '../../utils/types';
import PropTypes from 'prop-types';


function IngredientsCategory({ type, title, ingredients }) {
	return (
		<div>
			<h2 className="text text_type_main-medium">
				{title}
			</h2>
			<ul className={`${styles.typeList} mt-6 mr-2 mb-10 ml-4`} key={type}>
				{ingredients.map((ingredient) =>
					(
						<BurgerIngredient key={ingredient._id} ingredient={ingredient} />)
					)
				}
			</ul>
		</div>
	)
}

IngredientsCategory.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
	type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
	title: PropTypes.string
}

function BurgerIngredient({ ingredient }) {
	const count = Math.floor(Math.random() * 2);

	return (
		<li className={`${styles.item}`}>
			<img src={ingredient.image} alt={ingredient.name} className="pr-4 pl-4"/>
			{count > 0 && <Counter count={count} size={'default'} />}
			<div className={`${styles.itemCurrency} mb-1 mt-1`}>
				<p className="text text_type_digits-default mr-2">{ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${styles.itemCaption} text text_type_main-default pt-1`}>
				{ingredient.name}
			</p>
		</li>
	)
}

BurgerIngredient.propTypes = {
	ingredient: ingredientPropTypes.isRequired,
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
			<div className={`${styles.tabs} mb-10`}>
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
			<div className={styles.container}>
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

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}

export default BurgerIngredients;