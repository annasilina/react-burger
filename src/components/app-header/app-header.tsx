import React, {FC} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import styles from './app-header.module.css';
import {links} from '../../utils/constants';

import {BurgerIcon, ListIcon, Logo, ProfileIcon,} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: FC = () => {
	const {pathname} = useLocation();
	console.log(pathname);

	return (
		<>
			<header className={styles.header}>
				<nav className={`${styles.menu} pt-4 pb-4`}>
					<ul className={`${styles.menuList}`}>
						<li>
							<NavLink
								to={links.home}
								exact={true}
								className={`${styles.menuLink} text text_type_main-default pl-2 pt-4 pb-4 pr-5`}
								activeClassName={styles.menuLinkActive}
							>
								<BurgerIcon
									type={pathname === links.home ? 'primary' : 'secondary'}
								/>
								Конструктор
							</NavLink>
						</li>
						<li>
							<NavLink
								to={links.feedOrders}
								className={`${styles.menuLink} text text_type_main-default pl-2 pt-4 pb-4 pr-5`}
								activeClassName={styles.menuLinkActive}
							>
								<ListIcon
									type={
										pathname.includes(links.feedOrders)
											? 'primary'
											: 'secondary'
									}
								/>
								Лента заказов
							</NavLink>
						</li>
					</ul>
					<div className={`${styles.logo}`}>
						<Link to={links.home}>
							<Logo/>
						</Link>
					</div>
					<ul className={`${styles.menuList} ${styles.profile}`}>
						<li>
							<NavLink
								to={links.profile}
								className={`${styles.menuLink} text text_type_main-default pl-2 pt-4 pb-4 pr-5`}
								activeClassName={styles.menuLinkActive}
							>
								<ProfileIcon
									type={
										pathname.includes(links.profile) ? 'primary' : 'secondary'
									}
								/>
								Личный кабинет
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default AppHeader;
