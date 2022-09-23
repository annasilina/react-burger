import FeedCard from './feed-card';
import styles from './feed-list.module.css'
import {ordersFeed} from '../../utils/constants';

const FeedList = () => {
	const orders = ordersFeed.orders;
	return (
		<section>
			<h1 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h1>
			<div className={styles.container}>
			<ul className={styles.cardsList}>
				{orders.map((order) => (
					<FeedCard key={order.id} order={order}/>
				))}
			</ul>
			</div>
		</section>
	)
}


export default FeedList;