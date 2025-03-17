import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import APIContext from '../../contexts/APIContext';

function NevezesiLista({ allapot, kilep, esemeny, id }) {

    const { nevezesiLista, getEntryList } = useContext(APIContext)
    console.log(nevezesiLista)
    useEffect(() => {
        console.log(id)
        getEntryList(id)
    }, [])

    return (
        <Modal show={allapot} onHide={kilep} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>{esemeny}-ra/re leadott nevezések</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {nevezesiLista.map((elem, key) => {
                })}
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