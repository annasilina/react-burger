import FeedList from '../../components/feed-list/feed-list';
import styles from './feed.module.css'
import {useDispatch, useSelector} from 'react-redux';
import Preloader from '../../components/preloader/preloader';
import {useEffect} from 'react';
import FeedBoard from '../../components/feed-board/feed-board';
import {wsConnectionStart} from '../../services/actions/webSocket';

const FeedPage = () => {
	const ingredientsData = useSelector(state =>  state.ingredientsData);
	const orderData = useSelector(state => state.wsData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionStart())
	}, [])

	return (
		<>
			{!orderData.wsConnected && ingredientsData.ingredientsIsLoading && !orderData.orders.length && <Preloader type='loader'/>}
			{orderData.err && ingredientsData.ingredientsHasError && <Preloader type='error'/>}
			{orderData.wsConnected &&
				!orderData.error &&
				!!orderData.orders.length &&
				!ingredientsData.ingredientsIsLoading &&
				!ingredientsData.ingredientsHasError && (
					<section className={styles.main}>
						<h1 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h1>
						<section className={styles.container} >
							<FeedList orders={orderData.orders} />
							<FeedBoard />
						</section>
					</section>
				)
			}
		</>
	)
}

export default FeedPage;