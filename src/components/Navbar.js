import React from 'react';
import styles from '../styles/Navigation.module.css';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Navigation />
      <MobileNavigation />
    </div>
  );
}
