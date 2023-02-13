import React, { createContext, useEffect, useState } from 'react'
import Header from './Navbar/Header'
import TopNavbar from './TopNavbar/TopNavbar'
import axios from 'axios'
import { NewVacationForm } from './Forms/NewVacationForm'
import { NewVacationUpdateForm } from './Forms/NewVacationUpdateForm '
import { VacationDeleteForm } from './Forms/VacationDeleteForm'
import { LoginModal } from './Forms/LoginModal'
import { RegisterModal } from './Forms/RegisterModal'
import { About } from './TopNavbar/About'

export const context = createContext()

function App() {
  const [modeUser, setModeUser] = useState(false)
  const [isLogin, setIslogin] = useState(false)
  const [items, setItems] = useState([{}])
  const [openNewVacationModal, setOpenNewVacationModal] = useState(false)
  const [openNewVacationUpdateModal, setOpenNewVacationUpdateModal] =
    useState(false)
  const [updateData, setUpdateData] = useState('')
  const [openDeleteVacationModal, setOpenDeleteVacationModal] = useState(false)
  const [openAboutModal, setOpenAboutModal] = useState(false)
  const [deleteIdFromData, setDeleteIdFromData] = useState('')
  const [openLoginModal, setOpenLoginModal] = useState(!isLogin)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [modeAdmin, setModeAdmin] = useState(false)
  const [nameOfUser, setNameOfUser] = useState('Guest')

  const getVacations = () =>
    axios
      .get('http://localhost:8080/vacations')
      .then((response) => setItems(response.data))

  useEffect(() => {
    getVacations()
  }, [
    modeUser,
    isLogin,
    openNewVacationModal,
    openNewVacationUpdateModal,
    updateData,
    openDeleteVacationModal,
    deleteIdFromData,
    openLoginModal,
    modeAdmin,
    nameOfUser,
  ])

  if (items.length > 1) {
    return (
      <main>
        <context.Provider
          value={{
            items,
            setItems,
            openNewVacationModal,
            setOpenNewVacationModal,
            openNewVacationUpdateModal,
            setOpenNewVacationUpdateModal,
            updateData,
            setUpdateData,
            openDeleteVacationModal,
            setOpenDeleteVacationModal,
            deleteIdFromData,
            setDeleteIdFromData,
            openLoginModal,
            setOpenLoginModal,
            openRegisterModal,
            setOpenRegisterModal,
            isLogin,
            setIslogin,
            modeAdmin,
            setModeAdmin,
            modeUser,
            setModeUser,
            nameOfUser,
            setNameOfUser,
            openAboutModal,
            setOpenAboutModal,
          }}
        >
          <TopNavbar />
          {openAboutModal && <About />}
          {!openLoginModal &&
            !openRegisterModal &&
            !openDeleteVacationModal &&
            !openNewVacationModal &&
            !openNewVacationUpdateModal && <Header />}
          {(!openAboutModal && openLoginModal) && <LoginModal />}
          {openRegisterModal && <RegisterModal />}
          {openNewVacationModal && <NewVacationForm />}
          {openNewVacationUpdateModal && <NewVacationUpdateForm />}
          {openDeleteVacationModal && <VacationDeleteForm />}
        </context.Provider>
      </main>
    )
  }
}

export default App
