import OrderFullInfo from '../../components/order-full-info/order-full-info';
import styles from './feed-details.module.css'
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {wsConnectionClose, wsConnectionStart} from '../../services/actions/webSocket';
import {wsConnectionCloseAuth, wsConnectionStartAuth} from '../../services/actions/webSocketAuth';
import Preloader from '../../components/preloader/preloader';
import {useTDispatch} from '../../services/hooks';

const FeedDetailsPage = (props) => {
	const {wsAuth} = props;
	const dataAll = useSelector(state => state.wsData);
	const dataAuth = useSelector(state => state.wsAuthData);

	const data = wsAuth ? dataAuth : dataAll;

	const dispatch = useTDispatch();

	useEffect(() => {
		dispatch(wsAuth ? wsConnectionStartAuth() : wsConnectionStart());

		return () => {
			dispatch(wsAuth ? wsConnectionCloseAuth() : wsConnectionClose())
		}
	}, [dispatch])

	return !data.orders.length ? (
		<Preloader type='loader'/>
	) : (
		<>
			<main className={styles.main}>
				<OrderFullInfo wsAuth={wsAuth}/>
			</main>
		</>
	)
}

export default FeedDetailsPage;