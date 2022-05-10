import React from "react";

import styles from './burger-constructor.module.css';

import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientsList({ ingredients }) {
	return (
		ingredients.map(ingredient =>
				(
					ingredient.type !== 'bun' &&
					<li key={ingredient._id} className={`${styles.ingredientItem}`}>
						<div className="mr-2">
							<DragIcon type="primary" />
						</div>
						<ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} />
					</li>
				)
		)
	)
}

function BurgerConstructor(props) {
	const bun = props.currentIngredients.find(ingredient => ingredient.type === 'bun');
	const orderCost = props.currentIngredients.reduce((prevValue, ingredient) => {return prevValue + ingredient.price}, 0);

	return (
		<section className={`${styles.constructor} mt-25`}>
			<div className={`${styles.elementsContainer} ml-4`}>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="top" isLocked={true} thumbnail={bun.image} price={bun.price}  text={bun.name}/>
				</div>
				<ul className={`${styles.ingredientList}`}>
					<IngredientsList ingredients={props.currentIngredients} />
				</ul>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="bottom" isLocked={true} thumbnail={bun.image} price={bun.price}  text={bun.name}/>
				</div>
			</div>
			<div className={`${styles.order} mt-10 mr-4`}>
				<div className={`${styles.orderCost} mr-10`}>
					<p className="text text_type_digits-medium mr-2">
						{orderCost}
					</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<Button type={'primary'} size={'large'}>
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor;
