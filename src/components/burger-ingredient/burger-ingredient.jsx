import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';
import {ingredientPropTypes} from '../../types/ingredient';

const BurgerIngredient = React.memo(({ ingredient, setModalVisibility }) => {
	const handleClick = () => {setModalVisibility(ingredient)};

	return (
		<li key={ingredient._id} className={`${styles.item}`} onClick={handleClick}>
			<img src={ingredient.image} alt={ingredient.name} className="pr-4 pl-4"/>
			{ingredient.count > 0 && <Counter count={ingredient.count} size={'default'} />}
			<div className={`${styles.itemCurrency} mb-1 mt-1`}>
				<p className="text text_type_digits-default mr-2">{ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${styles.itemCaption} text text_type_main-default pt-1`}>
				{ingredient.name}
			</p>
		</li>
	)
})

BurgerIngredient.propTypes = {
	ingredient: ingredientPropTypes.isRequired,
	setModalVisibility: PropTypes.func.isRequired
}

export default BurgerIngredient
