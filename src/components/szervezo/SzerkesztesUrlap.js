import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../../css/Urlap.css";
import APIContext from "../../contexts/APIContext";
import { AuthContext } from "../../contexts/AuthContext";

function SzerkUrlap({ allapot, kilep, eventID }) {
  const { user } = useContext(AuthContext)
  const { helyszinLista, categoryLista, getHelyszin, getKategoriak, getSelectedCompetition, selectedCompetition, setSelectedCompetition, updateCompetition, getMyCompetitions, setSVL } = useContext(APIContext);

  useEffect(() => {
    getHelyszin();
    getKategoriak();
    if (eventID) {
      getSelectedCompetition(eventID)
    }
  }, [eventID]);

  const eventModosit = async (e) => {
    e.preventDefault();

    // Validációs szabályok
    const nameRegex = /^[\w\s]{3,}$/; // legalább 3 karakter, csak betűk, számok, szóköz
    const { event_name, place, description, start_date, end_date } = selectedCompetition;

    if (!nameRegex.test(event_name)) {
      alert("A megnevezésnek legalább 3 karakterből kell állnia, és csak betűket/számokat tartalmazhat!");
      return;
    }

    if (place === "Válassz egy helyszínt!") {
      alert("Kérlek válassz egy helyszínt!");
      return;
    }

    if (!description || description.length < 10) {
      alert("A leírásnak legalább 10 karakter hosszúnak kell lennie!");
      return;
    }

    if (new Date(start_date) > new Date(end_date)) {
      alert("A kezdési dátum nem lehet későbbi, mint a befejezési dátum!");
      return;
    }

    // Sikeres validáció után
    setSelectedCompetition((prevD) => ({ ...prevD, organiser: user.id }));
    updateCompetition(selectedCompetition, eventID);
    const updatedCompetitions = await getMyCompetitions(user.id);
    setSVL(updatedCompetitions);
    kilep();
  };



  return (
    <Modal show={allapot} onHide={kilep} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Verseny szerkesztése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="szerkurlap">
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">
              Megnevezés
            </label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              className="form-control"
              value={selectedCompetition.event_name}
              onChange={(e) =>
                setSelectedCompetition((elozoAdat) => ({
                  ...elozoAdat,
                  event_name: e.target.value,
                }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="helyszin" className="form-label">
              Helyszín
            </label>
            <select
              className="form-select"
              id="helyszin"
              name="helyszin"
              value={selectedCompetition.place}
              onChange={(e) =>
                setSelectedCompetition((elozoAdat) => ({ ...elozoAdat, place: e.target.value }))
              }
            >
              <option>Válassz egy helyszínt!</option>
              {helyszinLista.map((elem, key) => (
                <option key={key} value={elem.plac_id} >
                  {elem.place}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Leírás
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              rows="4"
              value={selectedCompetition.description} // Beállított leírás
              onChange={(e) =>
                setSelectedCompetition((elozoAdat) => ({
                  ...elozoAdat,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="start_date" className="form-label">
                Kezdés
              </label>
              <input
                className="form-control"
                type="date"
                name="start_date"
                id="start_date"
                value={selectedCompetition.start_date} // Kezdés dátuma
                onChange={(e) =>
                  setSelectedCompetition((elozoAdat) => ({
                    ...elozoAdat,
                    start_date: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="end_date" className="form-label">
                Vége
              </label>
              <input
                className="form-control"
                type="date"
                name="end_date"
                id="end_date"
                value={selectedCompetition.end_date} // Befejezés dátuma
                onChange={(e) =>
                  setSelectedCompetition((elozoAdat) => ({
                    ...elozoAdat,
                    end_date: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="text-center">
            <Button variant="secondary" onClick={kilep}>
              Mégse
            </Button>
            <Button className="ms-2" variant="success" type="submit" onClick={eventModosit}>
              Mentés
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal >
  );
}

export default SzerkUrlap;
