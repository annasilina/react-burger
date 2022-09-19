import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';
import {ConstructorContainer} from '../constructor-container/constructor-container';

const BurgerConstructor = React.memo(({ setModalVisibility }) => {
	const orderIsLoading = useSelector(state => state.orderData.orderIsLoading);
	const bunSelected = useSelector(state => state.constructorData.bunSelected);
	const ingredientsSelected = useSelector(state => state.constructorData.ingredientsSelected)

	const orderCost = useMemo(() => {
		return (
			bunSelected
				?
					ingredientsSelected.reduce((prevValue, ingredient) =>
					{return prevValue + ingredient.price}, bunSelected.price * 2)
				:
					ingredientsSelected.reduce((prevValue, ingredient) =>
					{return prevValue + ingredient.price}, 0)
		)
	}, [bunSelected, ingredientsSelected])

	const handleButtonClick = () => {
		setModalVisibility(ingredientsSelected);
	}

	return (
		<section className={`mt-25`}>
			<ConstructorContainer bunSelected={bunSelected} ingredientsSelected={ingredientsSelected}/>
			<div className={`${styles.order} mt-10 mr-4`}>
				<div className={`${styles.orderCost} mr-10`}>
					<p className="text text_type_digits-medium mr-2">
						{orderCost ? orderCost : 0}
					</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<Button type={'primary'} size={'large'} onClick={handleButtonClick}
								{...bunSelected && ingredientsSelected.length && !orderIsLoading  ? {disabled: false} : {disabled: true}}>
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
