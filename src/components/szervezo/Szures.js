import React, { useContext, useState } from 'react'
import APIContext from '../../contexts/APIContext'
import "../../css/Szures.css";
import { Modal } from 'react-bootstrap';

function Szures({ allapot, kilep, szuresekFunction }) {
    const { helyszinLista } = useContext(APIContext)
    const [place, setPlace] = useState();
    const [date, setDate] = useState();

    function szuresek(e, szurespar, newPlace = place, newDate = date) {
        e.preventDefault();
        szuresekFunction(szurespar, newPlace, newDate);
        kilep();
    }

    return (
        <Modal show={allapot} onHide={kilep} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Versenyek szűrései</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='szuresElemek'>
                    <button type="button" className="btn btn-outline-info mx-1 mb-1" onClick={(e) => szuresek(e, "osszes")}>Összes</button>
                    <button type="button" className="btn btn-outline-info mx-1 mb-1" onClick={(e) => szuresek(e, "lezajlott")}>Lezajlott</button>
                    <button type="button" className="btn btn-outline-info mx-1 mb-1" onClick={(e) => szuresek(e, "jelenlegi")}>Zajló</button>
                    <button type="button" className="btn btn-outline-info mx-1 mb-1" onClick={(e) => szuresek(e, "hamarosan")}>Közelgő</button>

                    <input type="date" onChange={(e) => {
                        const newDate = e.target.value;
                        setDate(newDate);
                        szuresek(e, "datumon", place, newDate);
                    }} />

                    <div className="mb-3" style={{ width: '100%' }}>
                        <select
                            className="form-select"
                            id="helyszin"
                            name="helyszin"
                            onChange={(e) => {
                                const newPlace = e.target.value;
                                setPlace(newPlace);
                                szuresek(e, "helyszinen", newPlace, date);
                            }}
                        >
                            <option>Helyszínek</option>
                            {helyszinLista.map((elem, key) => (
                                <option key={key} value={elem.plac_id}>
                                    {elem.place}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Szures;
