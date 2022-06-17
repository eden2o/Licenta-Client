import React from 'react';
import NavLinks from './NavLinks';
import styles from '../styles/Navigation.module.css';
import { BiCube } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link to='/' aria-label='pagina acasă'>
        <BiCube className={styles.logo} />
      </Link>
      <NavLinks />
    </nav>
  );
}
