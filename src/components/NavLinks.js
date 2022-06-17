import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiFactory } from 'react-icons/gi';
import { FaSitemap, FaClipboardList } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import styles from '../styles/Navigation.module.css';

export default function NavLinks(props) {
  return (
    <ul>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <NavLink to='/'>
          <div className={styles.navItem}>
            <AiFillHome className={styles.navLogo} />
            Acasă
          </div>
        </NavLink>
      </li>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <NavLink to='/comenzi'>
          <div className={styles.navItem}>
            <FaClipboardList className={styles.navLogo} />
            Comenzi
          </div>
        </NavLink>
      </li>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <NavLink to='/masini'>
          <div className={styles.navItem}>
            <GiFactory className={styles.navLogo} />
            Mașini-Unelte
          </div>
        </NavLink>
      </li>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <NavLink to='/componente'>
          <div className={styles.navItem}>
            <BsGearFill className={styles.navLogo} />
            Componente
          </div>
        </NavLink>
      </li>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <NavLink to='/produse'>
          <div className={styles.navItem}>
            <FaSitemap className={styles.navLogo} />
            Produse
          </div>
        </NavLink>
      </li>
    </ul>
  );
}
