import React, { useContext, useState } from "react";
import APIContext from "../../contexts/APIContext";
import NevezesiLista from "./NevezesiLista";
import SzerkUrlap from "./SzerkesztesUrlap";
import Torles from "./Torles";
import { AuthContext } from "../../contexts/AuthContext";

function Verseny({ elem, value }) {

  const { getSelectedCompetitions } = useContext(APIContext)
  const { user } = useContext(AuthContext)

  function torles(e) {
    e.preventDefault();
    value.torol(elem.compname, elem.id)
  }

  function nevezes(e) {
    e.preventDefault();
    value.nevezes(elem.compname, elem.id)
  }

  function szerkesztes(e) {
    e.preventDefault();
    value.szerkesztes(elem.id)
  }

  return (
    <>
      <div className={`card container mt-4 ${elem.id}`}>
        <h5 className="card-title mb-1" style={{ textAlign: 'center', paddingTop: '10px' }}>{elem.compname}</h5>
        <div className='card-header'>
          <img className="card-img-top" style={{ width: "100%" }} src={`http://localhost:8000/${elem.headerimage}`} alt={`${elem.headerimage}`} />
        </div>
        <div className="card-body">
          <p className="list-group-item">Versenyazonosító: {elem.id}</p>
          <p className="list-group-item">Helyszín: {elem.place}</p>
          <p className="list-group-item">Időtartam: {elem.start} - {elem.end}</p>
          <p className="list-group-item">Kategória: {elem.category}</p>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-outline-info mx-1 mb-1" onClick={(e) => nevezes(e)}> Nevezési lista </button>
          <button type="button" className="btn btn-outline-warning mx-1 mb-1" onClick={(e) => szerkesztes(e)}> Szerkesztés </button>
          <button type="button" className="btn btn-outline-danger mx-1 mb-1" onClick={(e) => torles(e)}> Törlés </button>
        </div>
      </div >
    </>
  );
}

export default Verseny;
