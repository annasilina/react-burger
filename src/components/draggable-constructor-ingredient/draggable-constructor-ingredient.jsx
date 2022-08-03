import React from 'react';

import styles from './draggable-constructor-ingredient.module.css';
import {ingredientPropTypes} from '../../types/ingredient';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function DraggableConstructorIngredient({ ingredient }) {
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
				/>
			</li>
		)
}

DraggableConstructorIngredient.propTypes = {
	ingredient: ingredientPropTypes.isRequired
}