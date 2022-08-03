import React from 'react';
import styles from './drop-target-constructor-container.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableConstructorIngredient from '../draggable-constructor-ingredient/draggable-constructor-ingredient';

export const DropTargetConstructorContainer = ({bunSelected, ingredientsSelected}) => {
	return (
		<div className={`${styles.elementsContainer} ml-4`}>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="top" isLocked={true} thumbnail={bunSelected.image} price={bunSelected.price}  text={`${bunSelected.name} (верх)`}/>
				</div>
				<ul className={`${styles.ingredientList}`}>
					{ingredientsSelected.map(ingredient => (
						<DraggableConstructorIngredient ingredient={ingredient} key={ingredient._id} />
					))}
				</ul>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="bottom" isLocked={true} thumbnail={bunSelected.image} price={bunSelected.price}  text={`${bunSelected.name} (низ)`}/>
				</div>
			</div>
	)
}