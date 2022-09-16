import React from 'react';

import styles from './ingredient-details.module.css';
import {useSelector} from 'react-redux';

const IngredientDetails = () => {
	const ingredientDetails = useSelector(state => state.detailsData.ingredientDetails)

	return (
		<>
			<img src={ingredientDetails.image} alt={ingredientDetails.name} className={`${styles.itemImage}`}/>
			<p className="text text_type_main-medium pt-4 pb-8">{ingredientDetails.name}</p>
			<ul className={`${styles.ingredientNutritionList}`}>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredientDetails.calories}</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Белки, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredientDetails.proteins}</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredientDetails.fat}</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
					<p className="text text_type_digits-default text_color_inactive">{ingredientDetails.carbohydrates}</p>
				</li>
			</ul>
		</>
	)
}

export default IngredientDetails;