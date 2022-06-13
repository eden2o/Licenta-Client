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
        PROIECTAREA UNUI ALGORITM ȘI REALIZAREA UNEI APLICAȚII INFORMATICE PENTRU ASISTAREA PLANIFICĂRII ACTIVITĂȚILOR DINTR-UN
        SISTEM DE FABRICAȚIE
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro neque, eveniet praesentium quibusdam velit fugit, commodi
        doloribus maiores quia dignissimos deserunt atque nesciunt nulla harum ad! Assumenda beatae vel cum dolorum quibusdam quas
        pariatur cumque commodi ratione eligendi rerum odit aspernatur adipisci similique quidem at ad, itaque obcaecati mollitia
        ex sed soluta aliquam rem facere! Molestiae, quasi recusandae expedita vitae cumque iure accusamus tempore laudantium
        cupiditate quaerat praesentium voluptatibus dicta nihil. Vitae explicabo quae sapiente quaerat, laudantium cum, fugit
        consectetur sint, quam quas possimus iure? Culpa eaque totam fuga, voluptatum blanditiis voluptatibus, beatae aliquid
        porro itaque natus dignissimos minima adipisci.
      </p>
    </article>
  );
}
