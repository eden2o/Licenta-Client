import React from 'react';
import styles from '../styles/Footer.module.css';
import NavLinks from './NavLinks';
import dayjs from 'dayjs';
export default function Footer() {
  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.detalii}>
          <h2>Detalii Proiect</h2>
          <p>
            In cadrul acestui proiect a fost elaborata tema "Proiectarea unui algoritm șI realizarea unei aplicații informatice
            pentru asistarea planificării activităților dintr-un sistem de fabricație"
          </p>
        </div>
        <div className={styles.navigare}>
          <h2>Navigare Rapida</h2>
          <NavLinks />
        </div>
        <div className={styles.contact}>
          <h2>Contact </h2>
          <p>Email: alintudor99@yahoo.com</p>
          <p>Telefon: 0760 911 209</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; Universitatea Politehnica Bucuresti - {dayjs().year()}</p>
      </div>
    </footer>
  );
}
