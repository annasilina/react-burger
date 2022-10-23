import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';
import {Route, Switch} from 'react-router-dom';
import OrdersHistory from '../orders-history/orders-history';
import {links} from '../../utils/constants';
import {FC} from "react";

const Profile: FC = () => {
	return (
			<main className={styles.main}>
				<ProfileMenu/>
				<Switch>
					<Route path={links.profile} exact>
						<ProfileForm />
					</Route>
					<Route path='/profile/orders' exact>
						<OrdersHistory />
					</Route>
				</Switch>
			</main>
	)
};

export default Profile;
