import {useParams} from 'react-router-dom';
import {ordersFeed} from '../../utils/constants';
import {useSelector} from 'react-redux';
import {calcOrderCost, getFormatDate, getFullIngredientsInfo} from '../../utils/utils';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-full-info.module.css'

const OrderFullInfo = () => {
	const allIngredientsList = useSelector(state => state.ingredientsData.ingredients);
	const {id} = useParams();

	const currentOrder = ordersFeed.orders.find(order => order._id === id);
	const ingredientsInOrder = getFullIngredientsInfo(allIngredientsList, currentOrder.ingredients);

	let ingredientsObj = {};

	ingredientsInOrder.forEach(ingredient => {
		if (ingredientsObj[ingredient._id] === undefined) {
			ingredientsObj[ingredient._id] = ingredient
		} else {
			ingredientsObj[ingredient._id].count++;
		}
	})

	const ingredientsWithCount = Object.values(ingredientsObj);
	const bunInOrder = ingredientsWithCount.filter(ingredient => ingredient.type === 'bun')[0];
	const otherIngredients = ingredientsWithCount.filter(ingredient => ingredient.type !== 'bun');

	return (
		<>
			<p className={`${styles.number} text text_type_digits-default`}>{`#0${currentOrder.number}`}</p>
			<h2 className='text text_type_main-medium pt-10 pb-3'>{ingredientsInOrder[2].name}</h2>
			<span className='text text_type_main-small text_color_success pb-15'>Выполнен</span>
			<h3 className='text text_type_main-medium pb-6'>Состав:</h3>
			<ul className={`${styles.list}`}>
				{ingredientsWithCount.map(ingredient => (
					<li key={ingredient.uniqID} className={styles.listItem}>
						<img
							src={ingredient.image_mobile}
							alt={ingredient.name}
							className={styles.image}
						/>
						<p className='text text_type_main-small'>{ingredient.name}</p>
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
					<p className='text text_type_digits-default pr-2'>{`${calcOrderCost(bunInOrder, otherIngredients)}`}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</>
	)
}

export default OrderFullInfo;
