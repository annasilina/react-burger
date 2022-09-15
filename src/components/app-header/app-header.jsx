import React from 'react';
import {Link} from 'react-router-dom';
import styles from './app-header.module.css';

import {BurgerIcon, Logo, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  return (
    <>
      <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <ul className={`${styles.menuList}`}>
          <li>
            <Link to="/" className={`${styles.menuLink} ${styles.menuItem} pl-5 pr-2`}>
              <BurgerIcon type={"primary"} />
              <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
            </Link>
          </li>
          <li>
            <Link to="/" className={`${styles.menuLink} ${styles.menuItem} pl-5`}>
              <ListIcon type={"secondary"} />
              <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
            </Link>
          </li>
        </ul>
          <div className={`${styles.logo}`}>
            <Link to="/" className={`${styles.menuLink}`}>
              <Logo />
            </Link>
          </div>
        <ul className={`${styles.menuList} ${styles.profile}`}>
          <li>
            <Link to="/profile" className={`${styles.menuLink} ${styles.menuItem}`}>
              <ProfileIcon type={"secondary"} />
              <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Личный кабинет</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  );
}

export default AppHeader;
