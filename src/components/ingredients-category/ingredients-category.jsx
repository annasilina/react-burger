import styles from './ingredients-category.module.css';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../types/ingredient';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import React from 'react';

export default function IngredientsCategory(props) {
	return (
		<div>
			<h2 className="text text_type_main-medium">
				{props.title}
			</h2>
			<ul className={`${styles.typeList} mt-6 mr-2 mb-10 ml-4`} key={props.type}>
				{props.ingredients.map((ingredient) =>
					(
						<BurgerIngredient key={ingredient._id} ingredient={ingredient} setIngredientId={props.setIngredientId} setModalVisibility={props.setModalVisibility} />)
				)
				}
			</ul>
		</div>
	)
}

IngredientsCategory.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
	type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
	title: PropTypes.string.isRequired,
	setIngredientId: PropTypes.func.isRequired,
	setModalVisibility: PropTypes.func.isRequired
}