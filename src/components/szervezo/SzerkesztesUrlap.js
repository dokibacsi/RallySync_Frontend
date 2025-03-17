import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Form, Modal } from "react-bootstrap";
import "../../css/Urlap.css";
import APIContext from "../../contexts/APIContext";

function SzerkUrlap({ allapot, kilep }) {
  const { user } = useContext(AuthContext);
  const { postCompetition } = useContext(APIContext);
  const { helyszinLista, categoryLista, getHelyszin, getKategoriak } = useContext(APIContext);
  const [data, setData] = useState({ organiser: user.id, category: [] });

  useEffect(() => {
    console.log(user)
    getHelyszin();
    getKategoriak();
  }, []);

  const eventFelvisz = async (e) => {
    e.preventDefault();
    postCompetition(data);
  };

  return (
    <Modal show={allapot} onHide={kilep} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Verseny szerkesztése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="szerkurlap" onSubmit={eventFelvisz}>
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">
              Megnevezés
            </label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              className="form-control"
              onChange={(e) =>
                setData((elozoAdat) => ({
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
              onChange={(e) =>
                setData((elozoAdat) => ({ ...elozoAdat, place: e.target.value }))
              }
            >
              <option>Válassz egy helyszínt</option>
              {helyszinLista.map((elem, key) => (
                <option key={key} value={elem.plac_id}>
                  {elem.place}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Kategória</label>
            <div className="category">
              {categoryLista.map((elem, key) => (
                <div className="catelem form-check" key={key}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={elem.categ_id}
                    id={`category-${elem.categ_id}`}
                    onChange={(e) =>
                      setData((elozoAdat) => ({
                        ...elozoAdat,
                        category: e.target.checked
                          ? [...elozoAdat.category, elem.categ_id]
                          : elozoAdat.category.filter(
                            (item) => item !== elem.categ_id
                          ),
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor={`category-${elem.categ_id}`}>
                    {elem.category}
                  </label>
                </div>
              ))}
            </div>
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
              onChange={(e) =>
                setData((elozoAdat) => ({
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
                onChange={(e) =>
                  setData((elozoAdat) => ({
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
                onChange={(e) =>
                  setData((elozoAdat) => ({
                    ...elozoAdat,
                    end_date: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="min_entry" className="form-label">
                Minimum jelentkezések
              </label>
              <input
                className="form-control"
                type="input"
                name="min_entry"
                id="min_entry"
                onChange={(e) =>
                  setData((elozoAdat) => ({
                    ...elozoAdat,
                    min_entry: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="max_entry" className="form-label">
                Maximum jelentkezések
              </label>
              <input
                className="form-control"
                type="input"
                name="max_entry"
                id="max_entry"
                onChange={(e) =>
                  setData((elozoAdat) => ({
                    ...elozoAdat,
                    max_entry: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="text-center">
            <Button variant="secondary" onClick={kilep}>
              Mégse
            </Button>
            <Button className="ms-2" variant="success" type="submit">
              Mentés
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SzerkUrlap;
