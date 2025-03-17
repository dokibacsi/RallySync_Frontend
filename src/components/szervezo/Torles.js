import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Piritos from '../Piritos'

function Torles({ allapot, kilep, enev, size }) {

    return (
        <Modal size={size} show={allapot} onHide={kilep} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>Biztosan törölni szeretnél?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>A törölni kívánt esemény: {enev}</p>
                <p><b>A törlés nem vonható vissza!</b></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={kilep} >
                    Mégse
                </Button>
                <Button variant="danger">
                    Törlés
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Torles