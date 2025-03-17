import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import APIContext from '../../contexts/APIContext';
import Verseny from './Verseny';
import SzervezoContext from '../../contexts/SzervezoContext';
import Torles from './Torles';
import Piritos from '../Piritos';
import NevezesiLista from './NevezesiLista';
import "../../css/szervezVersenyek.css";
import SzerkUrlap from './SzerkesztesUrlap';

function Versenyek() {
  const { user } = useContext(AuthContext);
  const { getMyCompetitions, sajatVersenyLista, destroyCompCateg, destroyCompetition } = useContext(APIContext);
  const { szerkeszt } = useContext(SzervezoContext)
  const [torolPanelAllapot, setTorolPanelAllapot] = useState(false)
  const [nevezesPanelAllapot, setNevezesPanelAllapot] = useState(false)
  const [szerkPanelAllapot, setSzerkPanelAllapot] = useState(false)
  const [piritosAllapot, setPiritosAllapot] = useState(false)
  const [esemenyNev, setEsemenyNev] = useState()
  const [adatok, setAdatok] = useState()
  const [eventID, setID] = useState()

  useEffect(() => {
    getMyCompetitions(user.id);
  }, [])

  function torol(esemenynev) {
    setTorolPanelAllapot(true)
    setEsemenyNev(esemenynev)
  }

  function nevezes(esemenynev, id) {
    setNevezesPanelAllapot(true)
    setID(id)
    console.log(id)
    setEsemenyNev(esemenynev)
  }

  function szerkesztes() {
    setSzerkPanelAllapot(true);
  }

  return (
    <div>
      <Torles allapot={torolPanelAllapot} kilep={() => setTorolPanelAllapot(false)} esemenyNev={esemenyNev} size="lg" />
      <NevezesiLista allapot={nevezesPanelAllapot} kilep={() => setNevezesPanelAllapot(false)} eventID={eventID} esemenyNev={esemenyNev} size="lg" />
      <SzerkUrlap allapot={szerkPanelAllapot} kilep={() => setSzerkPanelAllapot(false)} esemenyNev={esemenyNev} size="lg" />
      <Piritos allapot={piritosAllapot} kilep={() => setPiritosAllapot(false)} type={"success"} message={"Sikeresen bezártad a panelt!"} />
      <h1 className='row justify-content-center'>Szervezett versenyeim</h1>
      <div className='versenyek'>
        {
          sajatVersenyLista.map((elem, key) => {
            return (<Verseny elem={elem} key={key} value={{ torol, nevezes, szerkesztes, szerkeszt }} />)
          })
        }
      </div>
    </div>
  )
}

export default Versenyek
