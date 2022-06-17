import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import styles from '../styles/Componente.module.css';
import Pagination from '../components/Pagination';

export default function Componente() {
  const [listaComponente, setListaComponente] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [open, setOpen] = useState(false);
  var durata;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPage] = useState(12);

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

  const currentItems = listaComponente.slice(indexFirst, indexLast);

  useEffect(() => {
    document.title = 'Proiect de Diplomă | Componente';
    const controller = new AbortController();
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/componente', { signal: controller.signal })
      .then((response) => {
        setListaComponente(response.data);
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
  }, []);

  const durataTotala = (value) => {
    durata = 0;
    value.componentes.forEach((procedeu) => {
      durata += procedeu.durata;
    });
  };

  return (
    <>
      <h1>Componente</h1>
      <div className={styles.pagination}>
        <Pagination
          itemsPage={itemsPage}
          totalItems={listaComponente.length}
          currentPage={currentPage}
          paginate={paginate}
          increment={increment}
          decrement={decrement}
        />
      </div>
      <div className={styles.componente}>
        {isLoading && <Loading />}
        {listaComponente &&
          currentItems.map((value, key) => {
            return (
              <div key={key} className={styles.componenta}>
                <h3 className={styles.numeComponenta}>{value.denumire}</h3>
                {durataTotala(value)}
                <div className={`${styles.procedeu} ${styles.timp}`}>
                  <p> Timp de prelucrare total: </p>
                  <p>{durata} min</p>
                </div>
                <ul className={styles.procedee}>
                  {value.componentes.map((value, key) => {
                    return (
                      <li key={key} className={styles.procedeu}>
                        <p>{value.procedeu_prelucrare.denumire}</p>
                        <p>{value.durata} min</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
}
