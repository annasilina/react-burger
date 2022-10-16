import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-full-info.module.css'
import {getFormatDate} from '../../utils/getFormatDate';
import {getOrderStatus} from '../../order/getOrderStatus';
import {calcOrderCost} from '../../order/calcOrderCost';
import {getIngredientsWithCount} from '../../ingredients/getIngredientsWithCount';

const OrderFullInfo = (props) => {
	const { id } = useParams();
	const { wsAuth } = props;

	const allIngredientsList = useSelector(state => state.ingredientsData.ingredients);
	const feedData = useSelector((store) => store.wsData)
	const feedAuthData = useSelector((store) => store.wsAuthData)
	const data = wsAuth ? feedAuthData : feedData;

	const currentOrder = data.orders.find(order => order._id === id);
	const ingredientsWithCount = getIngredientsWithCount(allIngredientsList, currentOrder.ingredients);

	return (
		<main className={styles.container}>
			<p className={`${styles.number} text text_type_digits-default`}>{`#0${currentOrder.number}`}</p>
			<h2 className='text text_type_main-medium pt-10 pb-3'>{currentOrder.name}</h2>
			<p
				className={`${currentOrder.status === 'done' ? styles.done : ''} 
				text text_type_main-small pb-15`}>
				{getOrderStatus(currentOrder.status)}
			</p>
			<h3 className='text text_type_main-medium pb-6'>Состав:</h3>
			<ul className={`${styles.list}`}>
				{ingredientsWithCount.map(ingredient => (
					<li key={ingredient.uniqID} className={styles.listItem}>
						<img
							src={ingredient.image_mobile}
							alt={ingredient.name}
							className={styles.image}
						/>
						<p className='text text_type_main-default'>{ingredient.name}</p>
						<div className={`${styles.priceContainer}`}>
							{ingredient.type === 'bun'
								? <p className={`${styles.price} text text_type_digits-default pr-2`}>2 x {ingredient.price}</p>
								: <p className={`${styles.price} text text_type_digits-default pr-2`}>{ingredient.count} x {ingredient.price}</p>}
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>
			<div className={`${styles.infoContainer} pt-10`}>
				<p className='text text_type_main-default text_color_inactive'>{`${getFormatDate(currentOrder.createdAt)}`}</p>
				<div className={`${styles.orderCost}`}>
					<p className='text text_type_digits-default pr-2'>{`${calcOrderCost(ingredientsWithCount)}`}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</main>
	)
}

export default OrderFullInfo;
