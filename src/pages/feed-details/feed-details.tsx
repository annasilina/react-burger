import OrderFullInfo from '../../components/order-full-info/order-full-info';
import styles from './feed-details.module.css'
import {FC, useEffect} from 'react';
import {wsConnectionClose, wsConnectionStart} from '../../services/actions/webSocket';
import {wsConnectionCloseAuth, wsConnectionStartAuth} from '../../services/actions/webSocketAuth';
import Preloader from '../../components/preloader/preloader';
import {useTDispatch, useTSelector} from '../../services/hooks';

interface IFeedDetailsPageProps {
	wsAuth: boolean;
}

const FeedDetailsPage: FC<IFeedDetailsPageProps> = ({wsAuth}) => {

	const dataAll = useTSelector(state => state.wsData);
	const dataAuth = useTSelector(state => state.wsAuthData);

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