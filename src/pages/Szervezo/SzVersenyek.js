import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import APIContext from '../../contexts/APIContext';
import Verseny from './Verseny';
import SzervezoContext from '../../contexts/SzervezoContext';

function SzVersenyek() {
  const { user } = useContext(AuthContext);
  const { getMyCompetitions, sajatVersenyLista, destroyCompCateg, destroyCompetition } = useContext(APIContext);
  const {szerkeszt} = useContext(SzervezoContext)

  useEffect(() => {
      getMyCompetitions(user.id);
  }, [])

  function torol(id){
    
  }

  console.log(sajatVersenyLista)

  return (    
    <div>
      <h1>Szervezett versenyeim</h1>
      <div className='versenyek'>
      {
        sajatVersenyLista.map((elem, key) => {
        return(<Verseny elem = {elem} key = {key} value={{torol, szerkeszt}}/>)
      })
      }
      </div>
    </div>
  )
}

export default SzVersenyek
