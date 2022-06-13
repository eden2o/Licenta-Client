import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';
export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.error}>404</h1>
      <p>Pagina nu a fost gasita...</p>
      <Link to='/'>Inapoi la pagina principala</Link>
    </div>
  );
}
