import OrderFullInfo from '../../components/order-full-info/order-full-info';
import styles from './feed-details.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {wsConnectionClose, wsConnectionStart} from '../../services/actions/webSocket';
import {wsConnectionCloseAuth, wsConnectionStartAuth} from '../../services/actions/webSocketAuth';
import Preloader from '../../components/preloader/preloader';

const FeedDetailsPage = (props) => {
	const { wsAuth } = props;
	const ingredientsData = useSelector(state => state.ingredientsData);
	const dataAll = useSelector(state => state.wsData);
	const dataAuth = useSelector(state => state.wsAuthData);

	const data = wsAuth ? dataAuth : dataAll;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsAuth ? wsConnectionStartAuth() : wsConnectionStart());

		return () => {dispatch(wsAuth ? wsConnectionCloseAuth() : wsConnectionClose())}
	},[])

	return (
		<>{!data.wsConnected && ingredientsData.ingredientsIsLoading && <Preloader type='loader' />}
			{data.wsConnected && !data.error && !!data.orders.length && !ingredientsData.ingredientsIsLoading && (
				<main className={styles.main}>
					<OrderFullInfo wsAuth={wsAuth} data={data}/>
				</main>
			)}
		</>
	)
}

export default FeedDetailsPage;