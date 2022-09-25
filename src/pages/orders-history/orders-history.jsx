import FeedList from '../../components/feed-list/feed-list';
import styles from './orders-history.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {wsConnectionStartAuth} from '../../services/actions/webSocketAuth';
import {wsConnectionCloseAuth} from '../../services/actions/webSocketAuth';
import Preloader from '../../components/preloader/preloader';

const OrdersHistory = () => {
	const feedAuthData = useSelector(store => store.wsAuthData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionStartAuth());

		return () => {
			dispatch(wsConnectionCloseAuth());
		}
	}, [dispatch])

	return !feedAuthData.wsConnected ? (
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