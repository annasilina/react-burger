import FeedList from '../../components/feed-list/feed-list';
import styles from './feed.module.css'
import Preloader from '../../components/preloader/preloader';
import {FC, useEffect} from 'react';
import FeedBoard from '../../components/feed-board/feed-board';
import {wsConnectionClose, wsConnectionStart} from '../../services/actions/webSocket';
import {useTDispatch, useTSelector} from '../../services/hooks';

const FeedPage: FC = () => {
	const feedData = useTSelector(state => state.wsData);
	const dispatch = useTDispatch();

	useEffect(() => {
		dispatch(wsConnectionStart())

		return () => {
			dispatch(wsConnectionClose())
		}
	}, [dispatch])

	return feedData.orders.length === 0 ? (
		<Preloader type='loader' />
		) : (
		<>
			<section className={styles.main}>
				<h1 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h1>
				<section className={styles.container} >
					<FeedList orders={feedData.orders} />
					<FeedBoard />
				</section>
			</section>
		</>
	)
}

export default FeedPage;