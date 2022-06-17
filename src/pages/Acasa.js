import React from 'react';
import { useEffect } from 'react';

export default function Acasa() {
  useEffect(() => {
    document.title = 'Proiect de Diplomă';
  }, []);

  return (
    <article>
      <h1>Proiect de Diplomă - Tudor Alin-Alexandru</h1>
      <p>
        În cadrul acestui site este prezentată soluția proprie pentru tema "Proiectarea unui algoritm șI realizarea unei aplicații
        informatice pentru asistarea planificării activităților dintr-un sistem de fabricație".
      </p>
      <br />
      <p>
        Aplicația comunică prin intermediul unei baze de date cu tema A1: Aplicația de gestionare a comenzilor de produse, de unde
        poate prelua comenzi ce pot fi ulterior acceptate sau respinse prin apăsarea unui buton.
      </p>
      <br />
      <p> Comenzile vor fi apoi planificate automat în ordinea în care au fost acceptate de către utilizator.</p>
    </article>
  );
}
