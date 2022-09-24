import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';
import {Route, Switch} from 'react-router-dom';
import Page404 from '../page-404/page-404';
import OrdersHistory from '../orders-history/orders-history';
import {links} from '../../utils/constants';

const Profile = () => {
	return (
			<main className={styles.main}>
				<ProfileMenu/>
				<Switch>
					<Route path={links.profile} exact>
						<ProfileForm />
					</Route>
					<Route path={links.userOrdersHistory}>
						<OrdersHistory />
					</Route>
					<Route path='*'>
						<Page404 />
					</Route>
				</Switch>
			</main>
	)
};

export default Profile;
