import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './profile-menu.module.css';


const ProfileMenu = () => {
	return (
		<nav className={`${styles.menu} pl-5`}>
			<ul className={styles.menuList}>
				<li>
					<NavLink to="/profile" className={`${styles.menuLink} text text_type_main-medium`} activeClassName={styles.menuLinkActive}>
						Профиль
					</NavLink>
				</li>
				<li>
					<NavLink to="/order-history" exact={true} className={`${styles.menuLink} text text_type_main-medium`} activeClassName={styles.menuLinkActive}>
						История заказов
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} className={`${styles.menuLink} text text_type_main-medium`} activeClassName={styles.menuLinkActive}>
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