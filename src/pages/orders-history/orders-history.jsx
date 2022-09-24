import FeedList from '../../components/feed-list/feed-list';
import styles from './orders-history.module.css';

const OrdersHistory = () => {
	return (
		<section className={styles.container}>
			<FeedList />
		</section>
	)
}

export default OrdersHistory;