import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Piritos from '../Piritos'
import APIContext from '../../contexts/APIContext';
import { AuthContext } from '../../contexts/AuthContext';

function Torles({ allapot, kilep, esemenyNev, size, eventID }) {

    const { user } = useContext(AuthContext)
    const { destroyCompetition, getMyCompetitions } = useContext(APIContext)

    const eventTorol = async (e) => {
        e.preventDefault();
        destroyCompetition(eventID);
        getMyCompetitions(user.id)
        kilep();
    };

    return (
        <Modal size={size} show={allapot} onHide={kilep} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>Biztosan törölni szeretnél?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>A törölni kívánt esemény: {esemenyNev}</p>
                <p><b>A törlés nem vonható vissza!</b></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={kilep} >
                    Mégse
                </Button>
                <Button variant="danger" onClick={eventTorol}>
                    Törlés
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Torles