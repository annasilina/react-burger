import FeedCard from './feed-card';
import styles from './feed-list.module.css'
import {ordersFeed} from '../../utils/constants';

const FeedList = () => {
	const orders = ordersFeed.orders;
	console.log('tick')
	return (
		<section>
			<div className={styles.container}>
			<ul className={styles.cardsList}>
				{orders.map((order) => (
					<FeedCard key={order.number} order={order}/>
				))}
			</ul>
			</div>
		</section>
	)
}


export default FeedList;