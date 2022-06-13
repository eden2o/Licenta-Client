import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import styles from '../styles/Produse.module.css';
import Pagination from '../components/Pagination';

export default function Produse() {
  const [listaProduse, setListaProduse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPage] = useState(1);

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
    document.title = 'Proiect de Diploma | Produse';
    const controller = new AbortController();
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/produse', { signal: controller.signal })
      .then((response) => {
        setListaProduse(response.data);
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

  var durata;
  var suma;

  const durataTotala = (produs) => {
    durata = 0;
    produs.produses.forEach((componenta) => {
      suma = 0;
      componenta.componentum.componentes.forEach((procedeu) => {
        suma += procedeu.durata;
      });
      durata += suma * componenta.buc_componenta;
    });
    if (!produs.durata_fabricatie) insertDurata(produs.id, durata);
  };

  const insertDurata = (id, durata) => {
    axios
      .put('https://licenta-tudor-alin-api.herokuapp.com/produse', {
        id: id,
        durata_fabricatie: durata,
      })
      .then(() => {
        console.log('Inserat');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const currentItems = listaProduse.slice(indexFirst, indexLast);
  return (
    <>
      <h1>Produse</h1>
      <div className={'lista-produse'}>
        {isLoading && <Loading />}
        {listaProduse &&
          currentItems.map((produs, key) => {
            durataTotala(produs);
            return (
              <div key={key} className={styles.produs}>
                <div className={styles.header}>
                  <h2>{produs.denumire}</h2>
                  <h3>Durata de asamblare: {produs.durata_asamblare / 60} ore</h3>
                  <h3>
                    {durata % 60 === 0
                      ? `Durata de fabricatie: ${Math.floor(durata / 60)}`
                      : `Durata de fabricatie: ${Math.floor(durata / 60)} ore ${durata % 60} minute`}
                  </h3>
                </div>
                <Pagination
                  itemsPage={itemsPage}
                  totalItems={listaProduse.length}
                  currentPage={currentPage}
                  paginate={paginate}
                  increment={increment}
                  decrement={decrement}
                />
                <div className={styles.wrapperTable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th className={styles.wide}>Nume Componenta</th>
                        <th>Bucati</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produs.produses.map((componente, key) => {
                        return (
                          <tr key={key}>
                            <td className='id'>{componente.id} </td>
                            <td>{componente.componentum.denumire}</td>
                            <td className='id'>{componente.buc_componenta}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
