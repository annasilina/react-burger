import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './profile-menu.module.css';
import {links} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import {logout} from '../../services/actions/auth';

const ProfileMenu = () => {
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(logout())
	}

	return (
		<nav className={`${styles.menu} pl-5`}>
			<ul className={styles.menuList}>
				<li>
					<NavLink to={links.profile} exact={true} className={`${styles.menuLink} text text_type_main-medium`} activeClassName={styles.menuLinkActive}>
						Профиль
					</NavLink>
				</li>
				<li>
					<NavLink to={links.userOrdersFeed} exact={true} className={`${styles.menuLink} text text_type_main-medium`} activeClassName={styles.menuLinkActive}>
						История заказов
					</NavLink>
				</li>
				<li>
					<NavLink to='' onClick={signOut} className={`${styles.menuLink} text text_type_main-medium`} >
						Выход
					</NavLink>
				</li>
			</ul>
			<p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете
				изменить свои персональные данные</p>
		</nav>
	)
}

export default ProfileMenu;