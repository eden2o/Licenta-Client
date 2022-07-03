import React from 'react';
import styles from '../styles/Footer.module.css';
import NavLinks from './NavLinks';
import dayjs from 'dayjs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
export default function Footer() {
  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.detalii}>
          <h2>Detalii Proiect</h2>
          <p>
            În cadrul acestui proiect a fost elaborată tema "Proiectarea unui algoritm și realizarea unei aplicații informatice
            pentru asistarea planificării activităților dintr-un sistem de fabricație"
          </p>
        </div>
        <div className={styles.navigare}>
          <h2>Navigare Rapidă</h2>
          <NavLinks aria-label='Footer Navigation' />
        </div>
        <div className={styles.contact}>
          <h2>Contact </h2>
          <div onClick={() => window.open('mailto:alintudor99@yahoo.com')} className={styles.info}>
            <MdEmail />
            <p> alintudor99@yahoo.com</p>
          </div>
          <div onClick={() => window.open('tel:+040760911209', '_self')} className={styles.info}>
            <BsFillTelephoneFill />
            <p> 0760 911 209</p>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <a href='https://upb.ro/' target='_blank' rel='noopener noreferrer'>
          &copy; Universitatea Politehnica Bucuresti - {dayjs().year()}
        </a>
      </div>
    </footer>
  );
}
