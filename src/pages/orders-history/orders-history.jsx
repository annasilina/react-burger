import FeedList from '../../components/feed-list/feed-list';
import styles from './orders-history.module.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {wsConnectionStartAuth} from '../../services/actions/webSocketAuth';
import {wsConnectionCloseAuth} from '../../services/actions/webSocketAuth';
import Preloader from '../../components/preloader/preloader';
import {useTDispatch} from '../../services/hooks';

const OrdersHistory = () => {
	const feedAuthData = useSelector(store => store.wsAuthData);
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