import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import styles from '../styles/Masina.module.css';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export default function Comanda() {
  const { id } = useParams();
  const [comanda, setComanda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPage] = useState(10);

  const indexLast = currentPage * itemsPage;
  const indexFirst = indexLast - itemsPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const increment = (pages) => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };
  const decrement = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`https://licenta-tudor-alin-api.herokuapp.com/comenzi/date-comanda/${id}`, { signal: controller.signal })
      .then((response) => {
        setComanda(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.log(err.message);
        }
      });
    return () => controller.abort();
  }, [id]);

  const currentItems = comanda.slice(indexFirst, indexLast);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>Comanda {id}</h1>

      <div className={styles.wrapperComanda}>
        <Pagination
          itemsPage={itemsPage}
          totalItems={comanda.length}
          currentPage={currentPage}
          paginate={paginate}
          increment={increment}
          decrement={decrement}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.small}>ID</th>
              <th>Mașină</th>
              <th>Componentă</th>
              <th>Procedeu</th>
              <th>Început Operație</th>
              <th>Încheiere Operație</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((com) => {
              return (
                <tr key={com.id}>
                  <td data-label='ID' className='id'>
                    {com.id}
                  </td>
                  <td data-label='Masina'>{com.masina_unealtum.denumire}</td>
                  <td data-label='Componenta'>{com.componentum.denumire}</td>
                  <td data-label='Procedeu'>{com.procedeu_prelucrare.denumire}</td>
                  <td data-label='Data Inceput'>{dayjs.utc(com.inceput_operatie).format('YYYY-MM-DD, HH:mm:ss')}</td>
                  <td data-label='Data Incheiere'>{dayjs.utc(com.incheiere_operatie).format('YYYY-MM-DD, HH:mm:ss')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
