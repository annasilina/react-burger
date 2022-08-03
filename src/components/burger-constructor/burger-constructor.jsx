import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from 'react-redux';
import {DropTargetConstructorContainer} from '../drop-target-constructor-container/drop-target-constructor-container';

const BurgerConstructor = React.memo(({ setModalVisibility }) => {
	const bunSelected = useSelector(state => state.burger.bunSelected);
	const ingredientsSelected = useSelector(state => state.burger.ingredientsSelected)

	const orderCost = useMemo(() => {
		return ingredientsSelected.reduce((prevValue, ingredient) => {return prevValue + ingredient.price}, bunSelected.price * 2);
	}, [ingredientsSelected, bunSelected]);

	const handleButtonClick = () => setModalVisibility(ingredientsSelected);
	console.log('tick constructor');

	return (
		<section className={`mt-25`}>
			<DropTargetConstructorContainer bunSelected={bunSelected} ingredientsSelected={ingredientsSelected}/>
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
