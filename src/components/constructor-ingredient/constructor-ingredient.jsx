import React from 'react';

import styles from './constructor-ingredient.module.css';
import {ingredientPropTypes} from '../../types/ingredient';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from 'react-redux';
import {CONSTRUCTOR_DELETE_ITEM} from '../../services/actions/constructor';
import {DECREASE_INGREDIENT} from '../../services/actions/burger-ingredients';

export default function ConstructorIngredient({ ingredient }) {
	const dispatch = useDispatch();

	const handleDelete = (ingredient) => {
		dispatch({
			type: CONSTRUCTOR_DELETE_ITEM,
			payload: ingredient
		});
		dispatch({
			type: DECREASE_INGREDIENT,
			payload: ingredient
		})
	}

	return (
		ingredient.type !== 'bun' &&
			<li className={`${styles.ingredientItem}`}>
				<div className="mr-2">
					<DragIcon type="primary" />
				</div>
				<ConstructorElement
					text={ingredient.name}
					thumbnail={ingredient.image}
					price={ingredient.price}
					isLocked={false}
					handleClose={() => handleDelete(ingredient)}
				/>
			</li>
		)
}

ConstructorIngredient.propTypes = {
	ingredient: ingredientPropTypes.isRequired
}