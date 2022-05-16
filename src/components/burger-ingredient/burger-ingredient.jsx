import styles from './burger-ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropTypes} from '../../types/ingredient';
import PropTypes from 'prop-types';
import React from 'react';

export default function BurgerIngredient(props) {
	const count = Math.floor(Math.random() * 2);
	const showIngredientDetails = (ingredientId) => {
		props.setIngredientId(ingredientId);
		props.setModalVisibility(true);
	}

	return (
		<li key={props.ingredient._id} className={`${styles.item}`} onClick={() => showIngredientDetails(props.ingredient._id)}>
			<img src={props.ingredient.image} alt={props.ingredient.name} className="pr-4 pl-4"/>
			{count > 0 && <Counter count={count} size={'default'} />}
			<div className={`${styles.itemCurrency} mb-1 mt-1`}>
				<p className="text text_type_digits-default mr-2">{props.ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${styles.itemCaption} text text_type_main-default pt-1`}>
				{props.ingredient.name}
			</p>
		</li>
	)
}

BurgerIngredient.propTypes = {
	ingredient: ingredientPropTypes.isRequired,
	setIngredientId: PropTypes.func.isRequired,
	setModalVisibility: PropTypes.func.isRequired
}
