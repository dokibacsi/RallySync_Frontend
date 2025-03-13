import React, { useContext } from "react";
import APIContext from "../../contexts/APIContext";

function Verseny(props) {
  function torol(e){
    e.preventDefault();
    props.torol(props.elem.id)
  }

  return (
    <>
      <div className={`card container mt-4 ${props.elem.id}`}>
        <div className='card-body'>
          <h5 className="card-title mb-3">{props.elem.compname}</h5>
        </div>
        <div class="card-body">
          <p className="list-group-item">Helyszín: {props.elem.place}</p>
          <p className="list-group-item">Időtartam: {props.elem.start} - {props.elem.end}</p>
          <p className="list-group-item">Kategória: {props.elem.category}</p>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-outline-warning mx-1" > Szerkesztés </button>
          <button type="button" className="btn btn-outline-danger mx-1" onClick={(e) => {torol(e)}}> Törlés </button>
        </div>
      </div>
    </>
  );
}

export default Verseny;
