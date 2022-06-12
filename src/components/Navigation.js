import React from 'react';
import NavLinks from './NavLinks';
import styles from '../styles/Navigation.module.css';
import { BiCube } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink to='/'>
        <BiCube className={styles.logo} />
      </NavLink>
      <NavLinks />
    </nav>
  );
}
