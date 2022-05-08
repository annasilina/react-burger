import React from 'react';
import appHeaderStyles from './app-header.module.css';

import {BurgerIcon, Logo, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className="pt-4 pb-4">
        <ul className={appHeaderStyles.menuList}>
          <li className={appHeaderStyles.menuItem}>
            <BurgerIcon type={"primary"} />
            <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
          </li>
          <li className={appHeaderStyles.menuItem}>
            <ListIcon type={"secondary"} />
            <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
          </li>
        </ul>
      </nav>
      <div className={appHeaderStyles.logo}>
        <Logo />
      </div>
      <div className={appHeaderStyles.profile}>
        <ProfileIcon type={"secondary"} />
        <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Личный кабинет</p>
      </div>
    </header>
  );
}

export default AppHeader;
