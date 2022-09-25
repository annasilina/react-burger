import styles from './feed-board.module.css';
import {useSelector} from 'react-redux';

const FeedBoard = () => {
	const orders = useSelector(state => state.wsData.orders);
	const total = useSelector(state => state.wsData.total);
	const totalToday = useSelector(state => state.wsData.totalToday);
	const ordersComplete = orders.filter(order => order.status === 'done');
	const ordersPending = orders.filter(order => order.status === 'pending');


	return (
		<section className={styles.container}>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<h2 className='text text_type_main-medium pb-6'>Готовы:</h2>
					<ul className={styles.statusList}>
						{ordersComplete.slice(0, 10).map((order, index) => (
							<li
								className={`{styles.statusItem} text text_type_digits-default text_color_success`}
								key={index}
							>
								{order.number}
							</li>
						))}
					</ul>
				</li>
				<li className={styles.listItem}>
					<h2 className='text text_type_main-medium pb-6'>В работе:</h2>
					<ul className={styles.statusList}>
						{ordersPending.slice(0, 10).map((order, index) => (
							<li
								className={`{styles.statusItem} text text_type_digits-default`}
								key={index}
							>
								{order.number}
							</li>
						))}
					</ul>
				</li>
			</ul>
			<h2 className='text text_type_main-medium pt-15'>Выполнено за все время:</h2>
			<p className={`${styles.counter} text text_type_digits-large`}>{total}</p>
			<h2 className='text text_type_main-medium pt-15'>Выполнено за сегодня:</h2>
			<p className={`${styles.counter} text text_type_digits-large`}>{totalToday}</p>
		</section>
	)

}

export default FeedBoard;