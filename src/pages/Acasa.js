import React from 'react';
import { useEffect } from 'react';

export default function Acasa() {
  useEffect(() => {
    document.title = 'Proiect de Diploma';
  }, []);

  return (
    <article>
      <h1>Proiect de Diploma - Tudor Alin-Alexandru</h1>
      <p>
        In cadrul acestui site este prezentata solutia proprie pentru tema "Proiectarea unui algoritm șI realizarea unei aplicații
        informatice pentru asistarea planificării activităților dintr-un sistem de fabricație".
      </p>
      <br />
      <p>
        Aplicatia comunica prin intermediul unei baze de date cu tema A1: Aplicatia de gestionare a comenzilor de produse, de unde
        poate prelua comenzi ce pot fi ulterior acceptate sau respinse prin apasarea unui buton.
      </p>
      <br />
      <p> Comenzile vor fi apoi planificate automat in ordinea in care au fost acceptate de catre utilizator.</p>
    </article>
  );
}
