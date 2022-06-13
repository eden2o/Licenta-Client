import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/Masini.module.css';

export default function Masini() {
  const [listaMasini, setListaMasini] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Proiect de Diploma | Masini';
    const controller = new AbortController();
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/masini')
      .then((response) => {
        setListaMasini(response.data);
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

  return (
    <>
      <h1>Masini disponibile</h1>
      <div className={styles.listaMasini}>
        {isLoading && <Loading />}
        {listaMasini &&
          listaMasini.map((value, key) => {
            return (
              <Link key={key} to={`/masini/${value.id}`} className={styles.link}>
                <div className={styles.masina}>
                  <h2 className={styles.name}>{value.denumire}</h2>
                  <img className={styles.image} src={`../images/masina-${value.id}.jpg`} alt='poza'></img>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
