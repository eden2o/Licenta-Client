import React from 'react';
import NavLinks from './NavLinks';
import styles from '../styles/Navigation.module.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (
    <nav className={styles.mobileNavigation}>
      {open ? (
        <FiX className={styles.hamburger} onClick={() => setOpen(!open)} />
      ) : (
        <FiMenu className={styles.hamburger} onClick={() => setOpen(!open)} />
      )}
      {open ? <NavLinks isMobile={true} closeMenu={closeMenu} /> : null}
    </nav>
  );
}
