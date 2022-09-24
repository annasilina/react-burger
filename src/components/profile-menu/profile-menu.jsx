import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import styles from './profile-menu.module.css';
import {links} from '../../utils/constants';
import {logout} from '../../services/actions/auth';
import {useDispatch} from 'react-redux';
import {getCookie} from '../../utils/cookie';

const ProfileMenu = () => {
	const dispatch = useDispatch();
	const location = useLocation()

	const handleLogout = (evt) => {
		evt.preventDefault();
		dispatch(logout(getCookie('refreshToken')));
	};

	return (
		<nav className={`${styles.menu}`}>
			<ul className={styles.menuList}>
				<li>
					<NavLink
						to={links.profile}
						exact={true}
						className={`${styles.menuLink} text text_type_main-medium`}
						activeClassName={styles.menuLinkActive}
					>
						Профиль
					</NavLink>
				</li>
				<li>
					<NavLink
						to={links.userOrdersHistory}
						exact={true}
						className={`${styles.menuLink} text text_type_main-medium`}
						activeClassName={styles.menuLinkActive}
					>
						История заказов
					</NavLink>
				</li>
				<li>
					<button
						onClick={handleLogout}
						className={`${styles.menuLink} ${styles.menuButton} text text_type_main-medium`}
					>
						Выход
					</button>
				</li>
			</ul>
			{location.pathname === links.profile &&
				<p className='text text_type_main-default text_color_inactive pt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			}
			{location.pathname === links.userOrdersHistory &&
				<p className='text text_type_main-default text_color_inactive pt-20'>
					В этом разделе вы можете просмотреть свою историю заказов
				</p>
			}
		</nav>
	);
};

export default ProfileMenu;
