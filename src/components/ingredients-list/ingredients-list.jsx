import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredients-list.module.css';
import {ingredientPropTypes} from '../../types/ingredient';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientsList({ ingredients }) {
	return (
		ingredients.map(ingredient =>
			(
				ingredient.type !== 'bun' &&
				<li key={Math.random().toString(36).slice(2)} className={`${styles.ingredientItem}`}>
					<div className="mr-2">
						<DragIcon type="primary" />
					</div>
					<ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} />
				</li>
			)
		)
	)
}

IngredientsList.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}