import FeedList from '../../components/feed-list/feed-list';
import styles from './orders-history.module.css';
import {FC, useEffect} from 'react';
import {wsConnectionCloseAuth, wsConnectionStartAuth} from '../../services/actions/webSocketAuth';
import Preloader from '../../components/preloader/preloader';
import {useTDispatch, useTSelector} from '../../services/hooks';

const OrdersHistory: FC = () => {
	const feedAuthData = useTSelector(state => state.wsAuthData);
	const dispatch = useTDispatch();

	useEffect(() => {
		dispatch(wsConnectionStartAuth());

		return () => {
			dispatch(wsConnectionCloseAuth());
		}
	}, [dispatch])

	return !feedAuthData.orders.length ? (
	<Preloader type='loader' />
	) : (
		<>
			<section className={styles.container}>
				<FeedList orders={feedAuthData.orders} />
			</section>
		</>
	)
}

export default OrdersHistory;