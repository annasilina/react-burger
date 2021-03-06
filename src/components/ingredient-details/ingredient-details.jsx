import React from 'react';

import {ingredientPropTypes} from '../../types/ingredient';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
	return (
		<>
			<img src={ingredient.image} alt={ingredient.name} className={`${styles.itemImage}`}/>
			<p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
			<ul className={`${styles.ingredientNutritionList}`}>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Белки, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
				</li>
			</ul>
		</>
	)
}

IngredientDetails.propTypes = {
	ingredient: ingredientPropTypes.isRequired
}

export default IngredientDetails;