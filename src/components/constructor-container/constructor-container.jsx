import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-container.module.css';
import bunDefault from '../../images/bunDefault.png';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import {useDrop} from 'react-dnd';
import {useDispatch} from 'react-redux';
import {addIngredientToConstructor} from '../../services/actions/constructor';
import {increaseIngredient, selectIngredientBun} from '../../services/actions/burger-ingredients';

export const ConstructorContainer = ({bunSelected, ingredientsSelected}) => {
	const dispatch = useDispatch();

	const [{isHover}, dropTarget] = useDrop({
		accept: 'ingredient',
		collect(monitor) {
			return {
				isHover: monitor.isOver(),
			};
		},
		drop(item) {
			dispatch(addIngredientToConstructor(item));
			if (item.type === 'bun') {
				dispatch(selectIngredientBun(item));
			} else {
				dispatch(increaseIngredient(item));
			}
		},
	});

	const className = `${styles.elementsContainer} ml-4 ${
		isHover ? styles.markedContainer : ''
	}`;

	return (
		<div className={className} ref={dropTarget}>
			<div className={`${styles.ingredientElement} pl-8`}>
				{bunSelected !== null ? (
					<ConstructorElement
						type='top'
						isLocked={true}
						thumbnail={bunSelected.image}
						price={bunSelected.price}
						text={`${bunSelected.name} (верх)`}
					/>
				) : (
					<ConstructorElement
						type='top'
						isLocked={true}
						thumbnail={bunDefault}
						price='0'
						text='Пока тут пусто. Выберите булочку на ваш вкус.'
					/>
				)}
			</div>
			{ingredientsSelected.length === 0 ? (
				<p
					className={`${styles.emptyContainer} text text_type_main-default text_color_inactive`}
				>
					Пока здесь пусто. Перетащите ингредиенты из списка слева, чтобы
					собрать свой бургер.
				</p>
			) : (
				<ul className={`${styles.ingredientList}`}>
					{ingredientsSelected.map((ingredient, index) => (
						<ConstructorIngredient
							ingredient={ingredient}
							index={index}
							key={ingredient.constructorID}
						/>
					))}
				</ul>
			)}
			<div className={`${styles.ingredientElement} pl-8`}>
				{bunSelected !== null ? (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						thumbnail={bunSelected.image}
						price={bunSelected.price}
						text={`${bunSelected.name} (низ)`}
					/>
				) : (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						thumbnail={bunDefault}
						price='0'
						text='Пока тут пусто. Выберите булочку на ваш вкус.'
					/>
				)}
			</div>
		</div>
	);
};
