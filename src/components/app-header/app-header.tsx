import React from 'react';
import appHeaderStyles from './app.module.css';

import {BurgerIcon, Logo, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.menuList}>
          <li className={appHeaderStyles.menuItem}>
            <BurgerIcon type={"primary"} />
            <p>Конструктор</p>
          </li>
          <li className={appHeaderStyles.menuItem}>
            <ListIcon type={"secondary"} />
            <p>Лента заказов</p>
          </li>
        </ul>
        <div className="appHeaderStyles.logo">
          <Logo />
        </div>
        <div className={appHeaderStyles.profile}>
          <ProfileIcon type={"secondary"} />
          <p>Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
