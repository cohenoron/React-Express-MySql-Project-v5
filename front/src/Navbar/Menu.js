/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AiFillEdit } from 'react-icons/ai'
import { useContext } from 'react'
import { context } from '../App'
import { FiTrash2 } from 'react-icons/fi'
import Active from '../Navbar/icon-favorite/Active.png'
import Inactive from '../Navbar/icon-favorite/Inactive.png'

const Menu = ({ menuItems }) => {
  const {
    items,
    setOpenNewVacationUpdateModal,
    setUpdateData,
    setOpenDeleteVacationModal,
    setDeleteIdFromData,
    modeAdmin,
    modeUser,
  } = useContext(context)
  const [checked, setChecked] = useState([])

  useEffect(() => {
    if (modeUser) {
      const tkn = Cookies.get('token')
      axios
        .get(`http://localhost:8080/fav`, {
          withCredentials: true,
          headers: { authorization: `Bearer ${tkn}` },
        })
        .then(function (response) {
          const result = response.data.map(({ vacation_id }) => vacation_id)
          setChecked(result)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [])

  const handleCheck = (id) => {
    const jwt = Cookies.get('token')

    axios
      .patch(`http://localhost:8080/fav/${id}`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        const result = response.data.map(({ vacation_id }) => vacation_id)
        setChecked(result)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleUpdateEvent = (data) => {
    setOpenNewVacationUpdateModal(true)
    setUpdateData(data)
  }

  const handleDeleteEvent = (id) => {
    setOpenDeleteVacationModal(true)
    setDeleteIdFromData(id)
  }

  return (
    <div className="section-center">
      {items.map((menuItem) => {
        if (
          menuItems.length > 1 ||
          (menuItems.length === 1 &&
            menuItem.category === menuItems[0].category)
        ) {
          const {
            id,
            title,
            img_url,
            description,
            destination,
            price,
            date_start,
            date_end,
          } = menuItem
          return (
            <article key={id} className="menu-item">
              {modeUser && (
                <img
                  src={checked.includes(id) ? Active : Inactive}
                  alt={title}
                  className="like-icon"
                  value={checked.includes(id)}
                  onClick={(e) => handleCheck(id)}
                />
              )}
              {modeAdmin && (
                <FiTrash2
                  className="admin-delete-icon"
                  onClick={() => handleDeleteEvent(menuItem.id)}
                />
              )}
              <img src={img_url} alt={title} className="img-menu" />
              <h1 className="menu-item-header">
                {title} in {destination}
              </h1>
              <p className="menu-date">
                From {date_start.slice(0, date_start.length - 14)} To{' '}
                {date_end.slice(0, date_end.length - 14)}
              </p>
              <p className="item-text">{description}</p>
              <p className="price">Just $ {price} </p>
              {modeAdmin && (
                <AiFillEdit
                  className="admin-edit-icon"
                  onClick={() => handleUpdateEvent(menuItem)}
                />
              )}
            </article>
          )
        }
      })}
    </div>
  )
}

export default Menu
