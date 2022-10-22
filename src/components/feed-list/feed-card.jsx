import React from 'react';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-list.module.css';
import {getFormatDate} from '../../utils/getFormatDate';
import {getOrderStatus} from '../../order/getOrderStatus';
import {calcOrderCost} from '../../order/calcOrderCost';
import {getIngredientsInfo} from '../../ingredients/getIngredientsInfo';
import FeedIngredientImage from './feed-ingredient-image';
import {useTSelector} from '../../services/hooks';

const FeedCard = ({order}) => {
	const location = useLocation();
	const match = useRouteMatch();
	const maxVisibleQty = 6;

	const allIngredientsList = useTSelector(state => state.ingredientsData.ingredients);
	const ingredientsInOrder = getIngredientsInfo(allIngredientsList, order.ingredients);

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
						<p className='text text_type_digits-default'>{`${calcOrderCost(ingredientsInOrder)}`}</p>
						<CurrencyIcon type='primary'/>
					</div>
				</div>
				</Link>
			</li>
	)
}

export default FeedCard;