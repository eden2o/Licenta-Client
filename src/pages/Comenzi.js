import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiFillSchedule } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import styles from '../styles/Comenzi.module.css';

export default function Comenzi() {
  const [listaComenzi, setListaComenzi] = useState([]);
  const [dateComanda, setDateComanda] = useState([]);
  const [programMasini, setProgramMasini] = useState([]);
  const [firstDates, setFirstDates] = useState([]);
  const [lastDates, setLastDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ultimaData, setUltimaData] = useState([]);
  const [completate, setCompletate] = useState(1);
  const [updated, setUpdated] = useState(0);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    //initial get request for all data
    document.title = 'Proiect de Diplomă | Comenzi';
    loadComenzi();
    loadLista();
    getDates();
    getUltimaData();
    getProgram();
  }, [updated]);

  const getUltimaData = () => {
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/masini/data')
      .then((response) => {
        setUltimaData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getProgram = () => {
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/comenzi/date-masini')
      .then((response) => {
        setProgramMasini(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getDates = () => {
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/comenzi/firstdates')
      .then((response) => {
        setFirstDates(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });

    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/comenzi/lastdates')
      .then((response) => {
        setLastDates(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };

  const loadComenzi = () => {
    const controller = new AbortController();
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/comenzi', { signal: controller.signal })
      .then((response) => {
        setListaComenzi(response.data);
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
  };

  const loadLista = () => {
    axios
      .get('https://licenta-tudor-alin-api.herokuapp.com/comenzi/all')
      .then((response) => {
        setDateComanda(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };

  const deleteComanda = (id) => {
    axios.delete(`https://licenta-tudor-alin-api.herokuapp.com/comenzi/delete/${id}`).then(() => {
      console.log('deleted');
    });
  };

  const deleteProgram = (id) => {
    axios.delete(`https://licenta-tudor-alin-api.herokuapp.com/comenzi/delete-program/${id}`).then(() => {
      console.log('deleted');
    });
  };

  const updateStatus = (id_comanda, status) => {
    let id = id_comanda;
    let newStatus = status;
    axios
      .put('https://licenta-tudor-alin-api.herokuapp.com/comenzi/update', {
        id: id,
        status: newStatus,
      })
      .then(() => {
        console.log('updated');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sendPostRequest = (rand_tabel) => {
    axios
      .post('https://licenta-tudor-alin-api.herokuapp.com/comenzi', rand_tabel)
      .then(() => {
        loadLista();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateDataEstimata = (id, data) => {
    axios
      .put('https://licenta-tudor-alin-api.herokuapp.com/comenzi/data', {
        id: id,
        data_estimata: data,
      })
      .then(() => {
        console.log('updated');
        setUpdated(!updated);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const checkStatus = () => {
    var today = dayjs();
    for (let i = 0; i < firstDates.length; i++) {
      var first_date = dayjs(firstDates[i].program_masinas[0].inceput_operatie);
      if (today.isAfter(first_date)) updateStatus(firstDates[i].id, 'In desfasurare');
    }
    for (let j = 0; j < lastDates.length; j++) {
      var last_date = dayjs(lastDates[j].data_estimata);
      if (today.isAfter(last_date)) {
        updateStatus(lastDates[j].id, 'Completata');
        deleteProgram(lastDates[j].id);
      }
    }
  };

  setInterval(checkStatus, 1800000); //Verificare status / 30min

  const calculDataEstimata = () => {
    listaComenzi.forEach((comanda) => {
      if (comanda.status === 'In asteptare') {
        var zile = Math.ceil(
          (comanda.cantitate * comanda.produ.durata_asamblare) / 480 +
            (comanda.cantitate * (comanda.produ.durata_fabricatie / 3)) / 480
        );
        var min;
        if (ultimaData.length === 0) min = dayjs();
        else min = dayjs(ultimaData[0].incheiere_operatie);
        var check = min;
        for (let i = 1; i <= zile; i++) {
          if (check.day() === 5) {
            min = min.add(3, 'days');
            check = check.add(3, 'days');
          }
          check = check.add(1, 'days');
        }
        var data_estimata = dayjs(min).add(zile, 'days');

        if (comanda.data_estimata !== data_estimata.format('YYYY-MM-DD')) {
          updateDataEstimata(comanda.id, data_estimata.format('YYYY-MM-DD'));
        }
      }
    });
  };

  const calculProgram = (value) => {
    var com = value; //id comanda
    updateStatus(com, 'Planificata');
    var program = programMasini;
    for (let k = 0; k < dateComanda.length; k++) {
      if (dateComanda[k].id === com) {
        for (let i = 0; i < dateComanda[k].produ.produses.length; i++) {
          var nou;
          for (let j = 0; j < dateComanda[k].produ.produses[i].componentum.componentes.length; j++) {
            const componente = dateComanda[k].produ.produses[i]; // array cu componente
            const procedee = dateComanda[k].produ.produses[i].componentum.componentes[j]; // array cu procedee
            var durata_lot = dateComanda[k].cantitate * componente.buc_componenta * procedee.durata;
            // un lot reprezinta numarul de componente necesare comenzii
            var timp_pregatire;
            var rand_tabel = {};
            var id_masina;
            var breakCheck = false;
            var min = dayjs('2099-01-25');
            var ultima_operatie = dayjs('2022-06-19, 18:00:00 '); //Daca nu exista activitati programate, se incepe cat mai devreme posibil

            for (let y = 0; y < procedee.procedeu_prelucrare.masini_procedees.length; y++) {
              for (let l = 0; l < program.length; l++) {
                if (program[l].id === procedee.procedeu_prelucrare.masini_procedees[y].id_masina) {
                  if (program[l].program_masinas.length === 0) {
                    id_masina = program[l].id;
                    timp_pregatire = program[l].timp_pregatire;
                    min = dayjs('2099-01-25');
                    breakCheck = true;
                    break;
                  } else if (dayjs(program[l].program_masinas[0].incheiere_operatie).isBefore(min)) {
                    min = dayjs(program[l].program_masinas[0].incheiere_operatie);
                    id_masina = program[l].id;
                    timp_pregatire = program[l].timp_pregatire;
                  }
                }
              }
              if (breakCheck) break;
            }

            if (j !== 0) if (nou && nou.isAfter(ultima_operatie)) ultima_operatie = nou;
            if (min.isBefore(dayjs('2089-01-25')) && min.isAfter(ultima_operatie)) ultima_operatie = min;

            const ora_max = ultima_operatie.set('h', 17).set('date', ultima_operatie.date()).set('minute', 0).set('second', 0);
            var data_inceput = dayjs().add(timp_pregatire, 'minutes').set('second', 0);

            if (ultima_operatie.isAfter(dayjs())) data_inceput = dayjs(ultima_operatie).add(timp_pregatire, 'minutes');

            if (data_inceput.isAfter(ora_max)) {
              if (data_inceput.day() === 5) {
                data_inceput = ultima_operatie.set('h', 9).set('minute', timp_pregatire).set('second', 0).add(3, 'days');
              } else data_inceput = ultima_operatie.set('h', 9).set('minute', timp_pregatire).set('second', 0).add(1, 'days');
            }

            var data_sfarsit = data_inceput.set('h', 17).set('minute', 0).set('second', 0); //Data de sfarsit implicita

            if ((17 - data_inceput.hour()) * 60 - data_inceput.minute() >= durata_lot) {
              data_sfarsit = data_inceput.add(durata_lot, 'minute');
              rand_tabel = {
                id_masina: id_masina,
                id_componenta: componente.componentum.id,
                id_procedeu: procedee.id_procedeu,
                id_comanda: com,
                inceput_operatie: data_inceput.format('YYYY-MM-DD, HH:mm:ss'),
                incheiere_operatie: data_sfarsit.format('YYYY-MM-DD, HH:mm:ss'),
              };
              sendPostRequest(rand_tabel);
              nou = dayjs(data_sfarsit.format('YYYY-MM-DD, HH:mm:ss'));
              for (let m = 0; m < program.length; m++) {
                if (program[m].id === id_masina)
                  if (program[m].program_masinas.length === 0)
                    program[m].program_masinas[0] = { incheiere_operatie: data_sfarsit.toISOString() };
                  else program[m].program_masinas[0].incheiere_operatie = data_sfarsit.toISOString();
              }
            } else {
              durata_lot -= data_sfarsit.diff(data_inceput, 'minute');
              var zile = Math.floor(durata_lot / (480 - timp_pregatire)); //durata lotului in zile de 8 ore
              var minute = durata_lot % (480 - timp_pregatire); //minutele ramase in ultima zi
              var check = data_inceput;

              if (check.day() === 5) {
                data_sfarsit = data_sfarsit.add(2, 'days'); //daca data de azi e vineri se adauga doar 2 zile
                check = check.add(2, 'days');
              }

              for (let z = 1; z <= zile; z++) {
                check = check.add(1, 'days');
                if (check.day() === 5) {
                  data_sfarsit = data_sfarsit.add(3, 'days');
                  check = check.add(3, 'days');
                }
              }

              data_sfarsit = data_sfarsit.add(zile + 1, 'days');
              data_sfarsit = data_sfarsit.set('h', 9).set('minute', timp_pregatire).set('second', 0);
              data_sfarsit = data_sfarsit.add(minute, 'minute');

              rand_tabel = {
                id_masina: id_masina,
                id_componenta: componente.componentum.id,
                id_procedeu: procedee.id_procedeu,
                id_comanda: com,
                inceput_operatie: data_inceput.format('YYYY-MM-DD, HH:mm:ss'),
                incheiere_operatie: data_sfarsit.format('YYYY-MM-DD, HH:mm:ss'),
              };
              sendPostRequest(rand_tabel);
              nou = dayjs(data_sfarsit.format('YYYY-MM-DD, HH:mm:ss'));
              for (let m = 0; m < program.length; m++) {
                if (program[m].id === id_masina)
                  if (program[m].program_masinas.length === 0)
                    program[m].program_masinas[0] = { incheiere_operatie: data_sfarsit.toISOString() };
                  else program[m].program_masinas[0].incheiere_operatie = data_sfarsit.toISOString();
              }
            }
          }
        }
        var last = dayjs('1999-01-25');
        for (let m = 0; m < program.length; m++) {
          if (dayjs(program[m].program_masinas[0].incheiere_operatie).isAfter(last))
            last = dayjs(program[m].program_masinas[0].incheiere_operatie);
        }
        var zile_asamblare;
        var check2 = last;
        var ore_asamblare = ((dateComanda[k].produ.durata_asamblare * dateComanda[k].cantitate) % 480) / 60;
        console.log(nou.format('YYYY-MM-DD, HH:mm:ss'));
        if (ore_asamblare && 17 - data_sfarsit.hour() > ore_asamblare)
          zile_asamblare = Math.floor((dateComanda[k].produ.durata_asamblare * dateComanda[k].cantitate) / 480);
        else zile_asamblare = Math.ceil((dateComanda[k].produ.durata_asamblare * dateComanda[k].cantitate) / 480);
        for (let x = 1; x <= zile_asamblare; x++) {
          if (check2.day() === 5) {
            check2 = check2.add(2, 'days');
          }
          check2 = check2.add(1, 'days');
        }
        updateDataEstimata(com, check2.format('YYYY-MM-DD'));
      }
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>Comenzi</h1>
      <div className={styles.buttons}>
        <button
          className={`${styles.btn} ${completate ? styles.act : styles.inactive} ${styles.actuale} `}
          onClick={() => setCompletate(1)}
        >
          Actuale
        </button>
        <button
          className={`${styles.btn} ${completate === 0 ? styles.act : styles.inactive} ${styles.completate}`}
          onClick={() => setCompletate(0)}
        >
          Completate
        </button>
        <button className={`${styles.btn} ${styles.estimare}`} onClick={() => calculDataEstimata()}>
          Estimare Data
        </button>
      </div>
      <div className={styles.wrapperTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.small}>ID</th>
              <th className={styles.wide}>Client</th>
              <th className={styles.wide}>Produs</th>
              <th className={styles.small}>Cantitate</th>
              <th>Data Solicitată</th>
              <th>{completate ? 'Data Estimată' : 'Data Finalizare'}</th>
              <th>Status Comanda</th>
              <th className={styles.small}>#</th>
            </tr>
          </thead>
          <tbody>
            {listaComenzi.map((comanda, key) => {
              if (completate === 1 && comanda.status !== 'Completata')
                return (
                  <tr key={key}>
                    <td data-label='ID Comanda'>{comanda.id}</td>
                    <td data-label='Client'>{comanda.client.nume}</td>
                    <td data-label='Produs'>{comanda.produ.denumire}</td>
                    <td data-label='Cantitate'>{comanda.cantitate} buc.</td>
                    <td data-label='Data solicitata'>{comanda.data_solicitata}</td>
                    <td data-label='Data estimata'>{comanda.data_estimata ? comanda.data_estimata : '-'}</td>
                    <td
                      data-label='Status'
                      className={
                        comanda.status === 'In asteptare'
                          ? styles.gray
                          : comanda.status === 'Planificata'
                          ? styles.orange
                          : styles.blue
                      }
                    >
                      {comanda.status}
                    </td>
                    <td className={styles.tableButtons}>
                      {comanda.status === 'In asteptare' && comanda.data_estimata ? (
                        <>
                          <button className={`${styles.btn} ${styles.accept}`} onClick={() => calculProgram(comanda.id)}>
                            <AiFillCheckCircle />
                          </button>
                          <button className={`${styles.btn} ${styles.delete}`} onClick={() => setOpen(!open)}>
                            <RiDeleteBin2Fill />
                          </button>
                          <Modal
                            open={open}
                            close={() => {
                              setOpen(false);
                            }}
                          >
                            <h4 className={styles.modalTitle}>Ștergere Comandă?</h4>
                            <p className={styles.modalText}>Șterge comanda cu ID {comanda.id}?</p>
                            <div className={styles.modalButtons}>
                              <button
                                className={`${styles.btn} ${styles.confirm}`}
                                onClick={() => {
                                  deleteComanda(comanda.id);
                                  setOpen(!open);
                                }}
                              >
                                Da
                              </button>
                              <button className={`${styles.btn} ${styles.decline}`} onClick={() => setOpen(!open)}>
                                Nu
                              </button>
                            </div>
                          </Modal>
                        </>
                      ) : comanda.status !== 'In asteptare' ? (
                        <Link to={`/comenzi/${comanda.id}`} className={styles.program} aria-label='program comanda'>
                          <AiFillSchedule />
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                );
              else if (completate === 0 && comanda.status === 'Completata')
                return (
                  <tr key={key}>
                    <td data-label='ID Comanda' className='id'>
                      {comanda.id}
                    </td>
                    <td data-label='Client'>{comanda.client.nume}</td>
                    <td data-label='Produs'>{comanda.produ.denumire}</td>
                    <td data-label='Cantitate' className='id'>
                      {comanda.cantitate} buc.
                    </td>
                    <td data-label='Data solicitata'>{comanda.data_solicitata}</td>
                    <td data-label='Data estimata'>{comanda.data_estimata}</td>
                    <td data-label='Status' className={styles.green}>
                      {comanda.status}
                    </td>
                  </tr>
                );
              else return null;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
