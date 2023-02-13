import React, { useState, useContext } from 'react'
import axios from 'axios'
import { FaWindowClose } from 'react-icons/fa'
import { context } from '../App'
import Cookies from 'js-cookie'

export const VacationDeleteForm = () => {
  const [message, setMessage] = useState('')
  const { setOpenDeleteVacationModal, deleteIdFromData } = useContext(context)
  const id = deleteIdFromData
  const deleteRow = (id) => {
    const jwt = Cookies.get('token')
    axios
      .delete(`http://localhost:8080/delete/${id}`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
        id,
      })
      .then(function (response) {
        setMessage(response.data)
        if (response.status === 200) {
          setOpenDeleteVacationModal(false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <div id="form-delete-container">
        <form id="form-delete">
          <FaWindowClose
            id="close-delete-modal-icon"
            onClick={() => setOpenDeleteVacationModal(false)}
          />
          <h3 id="form-delete-header">Delete vaction {id}</h3>
          <input
            type="button"
            value="Delete"
            id="form-delete-btn"
            onClick={() => deleteRow(id)}
          />
          {message} <h4 id="message-after-delete">{message}</h4>
        </form>
      </div>
    </>
  )
}
