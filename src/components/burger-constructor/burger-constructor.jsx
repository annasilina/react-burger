import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../ingredients-list/ingredients-list';
import {useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';

const BurgerConstructor = React.memo(({ setModalVisibility }) => {
	const ingredients = useSelector(state => state.burger.ingredients);
	const bunSelected = useSelector(state => state.burger.bunSelected);
	const ingredientsSelected = useSelector(state => state.burger.ingredientsSelected)

	const orderCost = useMemo(() => {
		return ingredientsSelected.reduce((prevValue, ingredient) => {return prevValue + ingredient.price}, bunSelected.price * 2);
	}, [ingredientsSelected, bunSelected]);

	const handleButtonClick = () => setModalVisibility(ingredientsSelected);

	/*const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop: (target) => onDropHandler(target.id),
	})

	const onDropHandler = (targetID) => {
		const ingredientTarget = ingredients.filter((ingredient) => targetID === ingredient._id)
		const ingredientTargetObj = {...ingredientTarget[0], inConstructorID: Math.random().toString(36).slice(2)}


	}*/

	console.log('tick constructor');

	return (
		<section className={`mt-25`}>
			<div className={`${styles.elementsContainer} ml-4`}>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="top" isLocked={true} thumbnail={bunSelected.image} price={bunSelected.price}  text={`${bunSelected.name} (верх)`}/>
				</div>
				<ul className={`${styles.ingredientList}`}>
					<IngredientsList ingredients={ingredientsSelected} />
				</ul>
				<div className={`${styles.ingredientElement} pl-8`}>
					<ConstructorElement type="bottom" isLocked={true} thumbnail={bunSelected.image} price={bunSelected.price}  text={`${bunSelected.name} (низ)`}/>
				</div>
			</div>
			<div className={`${styles.order} mt-10 mr-4`}>
				<div className={`${styles.orderCost} mr-10`}>
					{
						orderCost &&
						<p className="text text_type_digits-medium mr-2">
							{orderCost}
						</p>
					}
					<CurrencyIcon type={'primary'} />
				</div>
				<Button type={'primary'} size={'large'} onClick={handleButtonClick}>
					Оформить заказ
				</Button>
			</div>
		</section>
	)
})

BurgerConstructor.propTypes = {
	setModalVisibility: PropTypes.func.isRequired
}

export default BurgerConstructor;
