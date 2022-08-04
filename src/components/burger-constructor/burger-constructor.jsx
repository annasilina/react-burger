import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from 'react-redux';
import {DropTargetConstructorContainer} from '../drop-target-constructor-container/drop-target-constructor-container';

const BurgerConstructor = React.memo(({ setModalVisibility }) => {
	const bunSelected = useSelector(state => state.constructorData.bunSelected);
	const ingredientsSelected = useSelector(state => state.constructorData.ingredientsSelected)

	const orderCost = useMemo(() => {
		return (
			bunSelected ?
				ingredientsSelected.reduce((prev, ingredient) =>
				{return prev + ingredient.price}, bunSelected.price * 2)
				:
				ingredientsSelected.reduce((prev, ingredient) =>
				{return prev + ingredient.price}, 0)
		)
	}, [bunSelected, ingredientsSelected])

	const handleButtonClick = () => setModalVisibility(ingredientsSelected);
	console.log('tick constructor');

	return (
		<section className={`mt-25`}>
			<DropTargetConstructorContainer bunSelected={bunSelected} ingredientsSelected={ingredientsSelected}/>
			<div className={`${styles.order} mt-10 mr-4`}>
				<div className={`${styles.orderCost} mr-10`}>
					<p className="text text_type_digits-medium mr-2">
						{orderCost ? orderCost : 0}
					</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<Button type={'primary'} size={'large'} onClick={handleButtonClick} disabled={!(orderCost && bunSelected)}>
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
