import React from 'react'
import { useContext } from 'react'
import { context } from '../App'
import Cookies from 'js-cookie'

const TopNavbar = () => {
  const logout = () => {
    setOpenLoginModal(true)
    setModeAdmin(false)
    setModeUser(false)
    Cookies.remove('token')
  }
  const loggin = () => {
    setOpenLoginModal(true)
    setModeUser(false)
    setModeAdmin(false)
    Cookies.remove('token')
  }
  const aboutModal = () => {
    setOpenAboutModal(true)
    setOpenLoginModal(false)
    setModeUser(false)
    setModeAdmin(false)
  
  }

  const {
    setOpenNewVacationModal,
    modeAdmin,
    nameOfUser,
    modeUser,
    setOpenLoginModal,
    setModeUser,
    setModeAdmin,
    openLoginModal,
    setOpenAboutModal,
    openRegisterModal,
    openAboutModal
  } = useContext(context)
  return (
    <>
      <div id="header">
        {!openLoginModal && !openAboutModal && !openRegisterModal && modeUser && (
          <div className="user-guest-div">
            <p className="hello-login-loguot">Hello, {nameOfUser}... </p>
            <button
              type="button"
              className="logout-btn"
              onClick={() => logout()}
            >
              {' '}
              Logout{' '}
            </button>
          </div>
        )}
        {!openLoginModal && !openAboutModal && !openRegisterModal && !modeUser && !modeAdmin && (
          <div className="user-guest-div">
            <p className="hello-login-loguot">Hello, {nameOfUser}... </p>
            <button
              type="button"
              className="loggin-btn"
              onClick={() => loggin()}
            >
              {' '}
              Loggin{' '}
            </button>
          </div>
        )}
        {!openLoginModal && !openAboutModal && !openRegisterModal && modeAdmin && (
          <div className="user-guest-div">
            <p className="hello-login-loguot">Hello, {nameOfUser}... (Admin)</p>
            <button
              type="button"
              className="logout-btn"
              onClick={() => logout()}
            >
              {' '}
              Logout{' '}
            </button>
            <button
              type="button"
              className="logout-btn"
              onClick={() => setOpenNewVacationModal(true)}
            >
              {' '}
              Add New Vacation{' '}
            </button>
          </div>
        )}
        <div id="topHeader">monster Vaction</div>
        {!openLoginModal && !openAboutModal && !openRegisterModal &&(<div id="navBar">
          <p id="home" onClick={() =>setOpenAboutModal(false) }>Home</p>
          <p id="about" onClick={() => aboutModal() }>
            About
          </p>
        </div>)}
      </div>
    </>
  )
}

export default TopNavbar
