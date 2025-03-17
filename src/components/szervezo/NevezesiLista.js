import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import APIContext from '../../contexts/APIContext';
import "../../css/NevezesiLista.css";

function NevezesiLista({ allapot, kilep, esemenyNev, eventID }) {

    const { getEntryList, nevezesiLista } = useContext(APIContext)
    useEffect(() => {
        if (eventID) {
            getEntryList(eventID);
        }
    }, [eventID]);

    return (
        <Modal show={allapot} onHide={kilep} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>{esemenyNev}-ra/re leadott nevezések</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {nevezesiLista && nevezesiLista.length > 0 ? (
                    <div className='jelentkezesek'>
                        {nevezesiLista.map((entry, key) => (
                            <p className='jelentkezes' id={`${key}`}>Név: {entry.name}, Autó: {entry.car}</p>
                        ))}
                    </div>
                ) : (<p>Nincs leadott nevezés.</p>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={kilep} >
                    Bezárás
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NevezesiLista