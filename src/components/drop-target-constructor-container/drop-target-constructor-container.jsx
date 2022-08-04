import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './drop-target-constructor-container.module.css';
import bunDefault from '../../images/bunDefault.png';
import DraggableConstructorIngredient from '../draggable-constructor-ingredient/draggable-constructor-ingredient';

export const DropTargetConstructorContainer = ({bunSelected, ingredientsSelected}) => {
	return (
		<div className={`${styles.elementsContainer} ml-4`}>
			<div className={`${styles.ingredientElement} pl-8`}>
					{bunSelected !== null
						?
							<ConstructorElement
								type="top"
								isLocked={true}
								thumbnail={bunSelected.image}
								price={bunSelected.price}
								text={`${bunSelected.name} (верх)`}
							/>
						:
							<ConstructorElement
								type="top"
								isLocked={true}
								thumbnail={bunDefault}
								price='0'
								text='Пока тут пусто. Выберите булочку на ваш вкус.'
							/>
					}
			</div>
			{!ingredientsSelected.length &&
				<p className={`${styles.emptyContainer} text text_type_main-default text_color_inactive`}>
					Пока здесь пусто. Перетащите ингредиенты из списка слева, чтобы собрать свой бургер.
				</p>
			}
			{ingredientsSelected.length !== 0 &&
				<ul className={`${styles.ingredientList}`}>
					{ingredientsSelected.map(ingredient => (
						<DraggableConstructorIngredient ingredient={ingredient}
																					key={ingredient._id}/>
					))}
				</ul>
			}
			<div className={`${styles.ingredientElement} pl-8`}>
				{bunSelected !== null
					?
					<ConstructorElement
						type="bottom"
						isLocked={true}
						thumbnail={bunSelected.image}
						price={bunSelected.price}
						text={`${bunSelected.name} (низ)`}
					/>
					:
					<ConstructorElement
						type="bottom"
						isLocked={true}
						thumbnail={bunDefault}
						price='0'
						text='Пока тут пусто. Выберите булочку на ваш вкус.'
					/>
				}
			</div>
		</div>
	)
}