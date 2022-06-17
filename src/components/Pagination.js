import React from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import styles from '../styles/Navigation.module.css';

export default function Pagination({ itemsPage, totalItems, paginate, increment, decrement, currentPage }) {
  const pageNumbers = [];
  var x = 0;

  for (let i = 1; i <= Math.ceil(totalItems / itemsPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={styles.pagination} aria-label='Pagination'>
      <ul>
        <li>
          <BiChevronsLeft onClick={() => decrement()} className={styles.chevron} />
        </li>
        {pageNumbers.map((number) => {
          if (pageNumbers <= 13)
            return (
              <li key={number}>
                <a
                  className={currentPage === number ? styles.activeLink : null}
                  href='#!'
                  onClick={() => {
                    paginate(number);
                  }}
                >
                  {number}
                </a>
              </li>
            );
          else if (number === currentPage || number <= 3 || number > pageNumbers.length - 3)
            return (
              <li key={number}>
                <a
                  className={currentPage === number ? styles.activeLink : null}
                  href='#!'
                  onClick={() => {
                    paginate(number);
                  }}
                >
                  {number}
                </a>
              </li>
            );
          else if (x === 0) {
            x++;
            return <li key={number}>...</li>;
          } else return null;
        })}
        <li>
          <BiChevronsRight onClick={() => increment(pageNumbers)} className={styles.chevron} />
        </li>
      </ul>
    </nav>
  );
}
