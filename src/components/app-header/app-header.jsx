import React from 'react';
import styles from './app-header.module.css';

import {BurgerIcon, Logo, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = React.memo(() => {
  console.log('appheader');
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <ul className={`${styles.menuList}`}>
          <li>
            <a href="/react-burger" className={`${styles.menuLink} ${styles.menuItem} pl-5 pr-2`}>
              <BurgerIcon type={"primary"} />
              <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
            </a>
          </li>
          <li>
            <a href="/react-burger" className={`${styles.menuLink} ${styles.menuItem} pl-5`}>
              <ListIcon type={"secondary"} />
              <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
            </a>
          </li>
        </ul>
          <div className={`${styles.logo}`}>
            <a href="/react-burger" className={`${styles.menuLink}`}>
              <Logo />
            </a>
          </div>
        <ul className={`${styles.menuList} ${styles.profile}`}>
          <li>
            <a href="/react-burger" className={`${styles.menuLink} ${styles.menuItem}`}>
              <ProfileIcon type={"secondary"} />
              <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
})

export default AppHeader;
