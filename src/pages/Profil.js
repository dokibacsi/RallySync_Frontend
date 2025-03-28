import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { Form } from 'react-router'

function Profil() {

  const { user } = useContext(AuthContext)
  const [newUserData, setNewUserDatas] = useState()

  return (
    <Form className="profileform">
      <div className="mb-3">
        <label htmlFor="userName" className="form-label">
          Név
        </label>
        <input
          type="text"
          name="userName"
          id="userName"
          className="form-control"
          value={user.name}
          onChange={(e) =>
            setNewUserDatas((elozoAdat) => ({
              ...elozoAdat,
              name: e.target.value,
            }))
          }

        />
      </div>

      <div className="text-center">
        <Button className="ms-2" variant="success" type="submit">
          Mentés
        </Button>
      </div>
    </Form>
  )
}

export default Profil