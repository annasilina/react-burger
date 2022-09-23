import React from 'react';
import styles from './feed-list.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FeedIngredientImage from './feed-ingredient-image';
import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {calcOrderCost} from '../../utils/utils';

const FeedCard = ({order}) => {
	const maxVisibleQty = 6;
	const allIngredientsList = useSelector(state => state.ingredientsData.ingredients);

	const ingredientsInOrder = order.ingredients
		.map((ingredient) => {
			return (ingredient = allIngredientsList.filter(({ _id }) => ingredient.includes(_id)))[0]
		})
		.map((ingredient) => {
			return {...ingredient, uniqId: uuid()}
		})

	const bunInOrder = ingredientsInOrder.filter(ingredient => ingredient.type === 'bun')[0];
	const otherIngredients = ingredientsInOrder.filter(ingredient => ingredient.type !== 'bun');

	return (
			<li className={styles.card}>
				<div className={styles.orderInfo}>
					<h2 className='text text_type_digits-default'>{`#${order.number}`}</h2>
					<p className='text text_type_main-default text_color_inactive'>{order.createdAt}</p>
				</div>
				<h3 className='text text_type_main-medium'>{ingredientsInOrder[2].name}</h3>
				<div className={styles.orderItems}>
					<ul className={styles.imageList}>
						{ingredientsInOrder.map((ingredient, index) => (
							<FeedIngredientImage
								ingredient={ingredient}
								index={index}
								totalQty={ingredientsInOrder.length}
								maxVisibleQty={maxVisibleQty}
								key={ingredient.uniqId}
							/>
							)).slice(0, maxVisibleQty)
						}
					</ul>
					<div className={styles.currency}>
						<p className='text text_type_digits-default'>{`${calcOrderCost(bunInOrder, otherIngredients)}`}</p>
						<CurrencyIcon type='primary'/>
					</div>
				</div>
			</li>
	)
}

export default FeedCard;