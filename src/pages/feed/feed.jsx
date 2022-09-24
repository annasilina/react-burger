import FeedList from '../../components/feed-list/feed-list';
import styles from './feed.module.css'
import {useDispatch, useSelector} from 'react-redux';
import Preloader from '../../components/preloader/preloader';
import {useEffect} from 'react';
import {getIngredients} from '../../services/actions/burger-ingredients';
import FeedBoard from '../../components/feed-board/feed-board';

const FeedPage = () => {
	const ingredientsData = useSelector(state =>  state.ingredientsData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients())
	}, [])

	return (
		{...ingredientsData.ingredientsIsLoading ? <Preloader />
				:
				<section className={styles.main}>
					<h1 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h1>
					<section className={styles.container} >
						<FeedList />
						<FeedBoard />
					</section>
				</section>
		}
	)
}

export default FeedPage;