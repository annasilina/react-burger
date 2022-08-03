import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredients-category.module.css';
import {ingredientPropTypes} from '../../types/ingredient';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';


const IngredientsCategory = React.forwardRef(({ title, ingredients, setModalVisibility, type}, ref) => {
	return (
		<div ref={ref}>
			<h2 className="text text_type_main-medium" id={type}>
				{title}
			</h2>
			<ul className={`${styles.typeList} mt-6 mr-2 mb-10 ml-4`}>
				{ingredients.map((ingredient) =>
					(
						<BurgerIngredient key={ingredient._id} ingredient={ingredient} setModalVisibility={setModalVisibility} />)
					)
				}
			</ul>
		</div>
	)
})


IngredientsCategory.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
	title: PropTypes.string.isRequired,
	setModalVisibility: PropTypes.func.isRequired
}

export default IngredientsCategory