import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import APIContext from '../../contexts/APIContext';
import Verseny from './Verseny';
import SzervezoContext from '../../contexts/SzervezoContext';
import Torles from './Torles';
import NevezesiLista from './NevezesiLista';
import "../../css/szervezVersenyek.css";
import SzerkUrlap from './SzerkesztesUrlap';
import Szures from './Szures';

function Versenyek() {
  const { user } = useContext(AuthContext);
  const { getMyCompetitions, sajatVersenyLista, getSelectedCompetition, destroyCompCateg, destroyCompetition, getMyCompletedCompetitions, getMyCurrentlyCompetitions, getMyUpcomingCompetitions, getMyCompetitionsOnSelectedDates, getMyCompetitionsOnSelectedPlace } = useContext(APIContext);
  const { szerkeszt } = useContext(SzervezoContext)
  const [torolPanelAllapot, setTorolPanelAllapot] = useState(false)
  const [nevezesPanelAllapot, setNevezesPanelAllapot] = useState(false)
  const [szerkPanelAllapot, setSzerkPanelAllapot] = useState(false)
  const [szuresPanelAllapot, setSzuresPanelAllapot] = useState(false)
  const [esemenyNev, setEsemenyNev] = useState()
  const [eventID, setID] = useState()


  useEffect(() => {
    getMyCompetitions(user.id);
    console.log(sajatVersenyLista)
  }, [])

  function torol(esemenynev, id) {
    setTorolPanelAllapot(true)
    setEsemenyNev(esemenynev)
    setID(id)
  }

  function nevezes(esemenynev, id) {
    setNevezesPanelAllapot(true)
    setID(id)
    setEsemenyNev(esemenynev)
  }

  function szerkesztes(id) {
    setSzerkPanelAllapot(true);
    setID(id)
  }

  function szuresek(szurespar, place, date) {
    setSzuresPanelAllapot(true);
    if (szurespar === "osszes") {
      getMyCompetitions(user.id);
    }
    if (szurespar === "lezajlott") {
      getMyCompletedCompetitions(user.id);
    }
    if (szurespar === "jelenlegi") {
      getMyCurrentlyCompetitions(user.id);
    }
    if (szurespar === "hamarosan") {
      getMyUpcomingCompetitions(user.id);
    }
    if (szurespar === "datumon") {
      getMyCompetitionsOnSelectedDates(user.id, date, date);
    }
    if (szurespar === "helyszinen") {
      getMyCompetitionsOnSelectedPlace(user.id, place);
    }
  }

  return (
    <div>
      <Torles allapot={torolPanelAllapot} kilep={() => setTorolPanelAllapot(false)} eventID={eventID} esemenyNev={esemenyNev} size="lg" />
      <NevezesiLista allapot={nevezesPanelAllapot} kilep={() => setNevezesPanelAllapot(false)} eventID={eventID} esemenyNev={esemenyNev} size="lg" />
      <SzerkUrlap allapot={szerkPanelAllapot} kilep={() => setSzerkPanelAllapot(false)} eventID={eventID} size="lg" />
      <h1 className='row justify-content-center'>Szervezett versenyeim</h1>
      <button className='btn btn-outline-info mx-1 mb-1' onClick={szuresek}>Szűrés panel</button>
      <Szures allapot={szuresPanelAllapot} kilep={() => setSzuresPanelAllapot(false)} szuresekFunction={szuresek} />
      <div className='versenyek'>
        {(sajatVersenyLista.length == 0) ? <h3>Nincs a szűrésnek megfelelő verseny!</h3> :
          sajatVersenyLista.map((elem, key) => {
            return (<Verseny elem={elem} key={key} value={{ torol, nevezes, szerkesztes, szerkeszt }} />)
          })
        }
      </div>
    </div>
  )
}

export default Versenyek
