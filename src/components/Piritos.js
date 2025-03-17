import React from 'react'
import { Toast } from 'react-bootstrap'

function Piritos({ tipus, uzenet, allapot }) {
    return (
        <Toast className={`toast align-items-center text-bg-${tipus} border-0`} show={allapot} role="alert" aria-live="assertive" aria-atomic="true" delay={3000} autohide>
            <div className="d-flex">
                <div className="toast-body">{uzenet}</div>
            </div>
        </Toast>
    )
}

export default Piritos