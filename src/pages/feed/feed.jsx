import FeedList from '../../components/feed-list/feed-list';
import styles from './feed.module.css'
import {useDispatch, useSelector} from 'react-redux';
import Preloader from '../../components/preloader/preloader';
import {useEffect} from 'react';
import {getIngredients} from '../../services/actions/burger-ingredients';

const FeedPage = () => {
	const ingredientsData = useSelector(state =>  state.ingredientsData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients())
	}, [])

	return (
		<section className={styles.container}>
			{ingredientsData.ingredientsIsLoading ? <Preloader /> : <FeedList />}
		</section>
	)
}

export default FeedPage;