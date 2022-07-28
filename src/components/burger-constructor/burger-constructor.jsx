import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsContext from '../../context/ingredients-context';

const BurgerConstructor = ({ setModalVisibility }) => {
	const ingredients = useContext(IngredientsContext).ingredients;
	const bun = ingredients.find(ingredient => ingredient.type === 'bun');
	const orderCost = ingredients.reduce((prevValue, ingredient) => {return prevValue + ingredient.price}, bun.price);
	console.log('tick constructor');

	return (
		<section className={`mt-25`}>
			<div className={`${styles.elementsContainer} ml-4`}>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="top" isLocked={true} thumbnail={bun.image} price={bun.price}  text={`${bun.name} (верх)`}/>
				</div>
				<ul className={`${styles.ingredientList}`}>
					<IngredientsList ingredients={ingredients} />
				</ul>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="bottom" isLocked={true} thumbnail={bun.image} price={bun.price}  text={`${bun.name} (низ)`}/>
				</div>
			</div>
			<div className={`${styles.order} mt-10 mr-4`}>
				<div className={`${styles.orderCost} mr-10`}>
					<p className="text text_type_digits-medium mr-2">
						{orderCost}
					</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<Button type={'primary'} size={'large'} onClick={setModalVisibility}>
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

BurgerConstructor.propTypes = {
	setModalVisibility: PropTypes.func.isRequired
}

export default BurgerConstructor;
