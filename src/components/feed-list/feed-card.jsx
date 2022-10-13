import React from 'react';
import styles from './feed-list.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FeedIngredientImage from './feed-ingredient-image';
import {useSelector} from 'react-redux';
import {calcOrderCost, getFullIngredientsInfo} from '../../utils/utils';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {getFormatDate} from '../../utils/getFormatDate';
import {getOrderStatus} from '../../utils/getOrderStatus';

const FeedCard = ({order}) => {
	const location = useLocation();
	const match = useRouteMatch();
	const maxVisibleQty = 6;

	const allIngredientsList = useSelector(state => state.ingredientsData.ingredients);
	const ingredientsInOrder = getFullIngredientsInfo(allIngredientsList, order.ingredients);
	const bunInOrder = ingredientsInOrder.filter(ingredient => ingredient.type === 'bun')[0];
	const otherIngredients = ingredientsInOrder.filter(ingredient => ingredient.type !== 'bun');

	return (
			<li>
				<Link to={{
					pathname: `${match.path}/${order._id}`,
					state: {background: location}
				}}
							className={styles.link}
				>
					<div className={styles.orderInfo}>
						<h2 className='text text_type_digits-default'>{`#${order.number}`}</h2>
						<p className='text text_type_main-default text_color_inactive'>{`${getFormatDate(order.createdAt)}`}</p>
					</div>
					<h3 className='text text_type_main-medium pt-6'>{order.name}</h3>
					{match.path.includes('profile') &&
						<p
							className={`${order.status === 'done' ? styles.done : ''}
							text text_type_main-small pt-2`}
						>
							{getOrderStatus(order.status)}
						</p>
					}
					<div className={styles.orderItems}>
					<ul className={styles.imageList}>
						{ingredientsInOrder.map((ingredient, index) => (
							<FeedIngredientImage
								ingredient={ingredient}
								index={index}
								totalQty={ingredientsInOrder.length}
								maxVisibleQty={maxVisibleQty}
								key={ingredient.uniqID}
							/>
							)).slice(0, maxVisibleQty)
						}
					</ul>
					<div className={styles.currency}>
						<p className='text text_type_digits-default'>{`${calcOrderCost(bunInOrder, otherIngredients)}`}</p>
						<CurrencyIcon type='primary'/>
					</div>
				</div>
				</Link>
			</li>
	)
}

export default FeedCard;