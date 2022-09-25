import OrderFullInfo from '../../components/order-full-info/order-full-info';
import styles from './feed-details.module.css'

const FeedDetailsPage = (props) => {
	const { wsAuth } = props;
	return (
		<main className={styles.main}>
			<OrderFullInfo />
		</main>
	)
}

export default FeedDetailsPage;