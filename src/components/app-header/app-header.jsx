import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import styles from './app-header.module.css';

import {BurgerIcon, Logo, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  const location = useLocation();

  return (
    <>
      <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <ul className={`${styles.menuList}`}>
          <li>
            <NavLink to="/" exact={true} className={`${styles.menuLink} text text_type_main-default pl-2 pt-4 pb-4 pr-5`} activeClassName={styles.menuLinkActive}>
              <BurgerIcon type={location.pathname === "/" ? 'primary' : 'secondary'} />
              Конструктор
            </NavLink>
          </li>
          <li>
            <NavLink to="/order-list" exact={true} className={`${styles.menuLink} text text_type_main-default pl-2 pt-4 pb-4 pr-5`} activeClassName={styles.menuLinkActive}>
              <ListIcon type={location.pathname === "/order-list" ? 'primary' : 'secondary'} />
              Лента заказов
            </NavLink>
          </li>
        </ul>
          <div className={`${styles.logo}`}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
        <ul className={`${styles.menuList} ${styles.profile}`}>
          <li>
            <NavLink to="/profile" className={`${styles.menuLink} text text_type_main-default pl-2 pt-4 pb-4 pr-5`} activeClassName={styles.menuLinkActive}>
              <ProfileIcon type={location.pathname === "/profile" ? 'primary' : 'secondary'} />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </>
  );
}

export default AppHeader;
