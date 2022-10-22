import React from 'react';

import styles from './ingredient-details.module.css';
import {useParams} from 'react-router-dom';
import Preloader from '../preloader/preloader';
import {useTSelector} from '../../services/hooks';

const IngredientDetails = () => {
	// const ingredients = useSelector((store) => store.ingredientsData.ingredients);
	const ingredients = useTSelector((store) => store.ingredientsData.ingredients);
	const {id} = useParams();
	const ingredient = ingredients.find((item) => item._id === id);

	return !ingredients.length ? (
		<Preloader type='preloader' />
		) : (
		<>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className={`${styles.itemImage}`}
			/>
			<p className='text text_type_main-medium pt-4 pb-8'>{ingredient.name}</p>
			<ul className={`${styles.ingredientNutritionList}`}>
				<li className={`${styles.nutritionItem}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.calories}
					</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.proteins}
					</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.fat}
					</p>
				</li>
				<li className={`${styles.nutritionItem}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.carbohydrates}
					</p>
				</li>
			</ul>
		</>
	);
};

export default IngredientDetails;
