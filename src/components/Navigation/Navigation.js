import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import style from './Navigation.module.css';

const Navigation = () => (
  <ul className={style.list}>
    <li className={style.li}>
      <NavLink exact to={routes.HOME} className={style.link}>
        Home
      </NavLink>
    </li>
    <li className={style.li}>
      <NavLink to={routes.MOVIES} className={style.link}>
        Search Movies
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
