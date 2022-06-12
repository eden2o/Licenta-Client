import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import styles from '../styles/Masina.module.css';

export default function Masina() {
  const { id } = useParams();
  const [masini, setMasini] = useState([]);
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
  const today = dayjs();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:3001/masini/${id}`, { signal: controller.signal })
      .then((response) => {
        setMasini(response.data);
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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {masini &&
        masini.map((masina, key) => {
          const currentItems = masina.program_masinas.slice(indexFirst, indexLast);
          return (
            <div key={key} className={styles.wrapperTable}>
              <div className={styles.hero}>
                <div className={styles.picture}>
                  <h2>{masini[0].denumire}</h2>
                  <img className={styles.image} src={`../images/masina-${id}.jpg`} alt='poza'></img>
                </div>
                <div className={styles.details}>
                  <h3>Timp de pregatire: {masina.timp_pregatire} min </h3>
                  <h3>Procedee Disponibile:</h3>
                  <ul>
                    {masina.masini_procedees.map((procedeu, key) => {
                      return <li key={key}>{procedeu.procedeu_prelucrare.denumire}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <h2>Program Masina</h2>
              <Pagination
                itemsPage={itemsPage}
                totalItems={masina.program_masinas.length}
                currentPage={currentPage}
                paginate={paginate}
                increment={increment}
                decrement={decrement}
              />
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Comanda</th>
                    <th>Componenta</th>
                    <th>Procedeu</th>
                    <th>Inceput Operatie</th>
                    <th>Incheiere Operatie</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((program, key) => {
                    if (dayjs(program.inceput_operatie).isAfter(today))
                      return (
                        <tr key={key}>
                          <td className='id' data-label='ID Comanda'>
                            Comanda {program.id_comanda}
                          </td>
                          <td data-label='Componenta'>{program.componentum.denumire} </td>
                          <td data-label='Porcedeu'>{program.procedeu_prelucrare.denumire}</td>
                          <td data-label='Data Inceput'>{dayjs(program.inceput_operatie).format('YYYY-MM-DD, HH:mm:ss')} </td>
                          <td data-label='Data Incheiere'>{dayjs(program.incheiere_operatie).format('YYYY-MM-DD, HH:mm:ss')}</td>
                        </tr>
                      );
                    else return null;
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
    </>
  );
}
