import React from 'react';
import ReactDom from 'react-dom';
import styles from '../styles/Modal.module.css';

export default function Modal({ open, children, close }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <div className={styles.modalWrapper}>
      <div onClick={close} className={styles.modalBackground} />
      <div className={styles.modalContent}>{children}</div>
    </div>,
    document.getElementById('portal')
  );
}
