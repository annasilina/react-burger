import React from 'react';
import {useState} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import {ingredientPropTypes} from '../../types/ingredient';
import PropTypes from 'prop-types';
import IngredientsCategory from '../ingredients-category/ingredients-category';

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
					setIngredientId={props.setIngredientId}
					setModalVisibility={props.setModalVisibility}
				/>
				<IngredientsCategory
					type="main"
					title='Начинки'
					ingredients={ingredientsTypeMain}
					setIngredientId={props.setIngredientId}
					setModalVisibility={props.setModalVisibility}
				/>
				<IngredientsCategory
					type="sauce"
					title='Соусы'
					ingredients={ingredientsTypeSauce}
					setIngredientId={props.setIngredientId}
					setModalVisibility={props.setModalVisibility}
				/>
			</div>
		</section>
	)
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
	setIngredientId: PropTypes.func.isRequired,
	setModalVisibility: PropTypes.func.isRequired
}

export default BurgerIngredients;