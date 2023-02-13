import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FaWindowClose } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { context } from '../App'
import Cookies from 'js-cookie'

const schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().min(4).max(4).required(),
})

export const LoginModal = () => {
  const {
    setOpenLoginModal,
    setOpenRegisterModal,
    setIslogin,
    setModeAdmin,
    setModeUser,
    setNameOfUser,
  } = useContext(context)
  const [message, setMessage] = useState('')
  const createUser = (event) => {
    event.preventDefault()
    let formData = {
      userName: event.target[0].value,
      password: event.target[1].value,
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const jwt = Cookies.get('token')
    if (jwt) {
      setIslogin(true)
      setOpenLoginModal(false)

      axios
        .get('http://localhost:8080/profile', {
          withCredentials: true,
          headers: { authorization: `Bearer ${jwt}` },
        })
        .then(function (response) {
          const { userName, admin } = response.data
          if (admin) {
            setModeAdmin(true)
            setModeUser(false)
            setNameOfUser(userName)
          }
          if (!admin) {
            setModeUser(true)
            setModeAdmin(false)
            setNameOfUser(userName)
          }
        })
        .catch(function (error) {
          console.log(error.message)
        })
    }
  }, [])

  const submitLogin = (data) => {
    Cookies.remove('token')
    axios
      .post('http://localhost:8080/login', {
        data,
      })
      .then(function (response) {
        const { accessToken, userName, admin } = response.data
        Cookies.set('token', accessToken, { expires: 0.1 })
        if (response.status === 200) {
          setMessage('Successfully logged in')
          setOpenLoginModal(false)
          if (admin) {
            setModeAdmin(true)
            setModeUser(false)
            setNameOfUser(userName)
          }
          if (!admin) {
            setModeUser(true)
            setModeAdmin(false)
            setNameOfUser(userName)
          }
        }
      })
      .catch(function (error) {
        setMessage(error.response.data)
      })
  }

  const handleRegister = () => {
    setOpenLoginModal(false)
    setOpenRegisterModal(true)
  }

  useEffect(() => {})

  return (
    <>
      <div className="form-login-container">
        <form className="form-login" onSubmit={handleSubmit(submitLogin)}>
          <FaWindowClose
            id="form-login-closeModal-icon"
            onClick={() => setOpenLoginModal(false)}
          />
          <h3 className="form-login-header">Login</h3>
          <label className="form-login-lable"></label>
          <input
            className="form-login-input"
            type="text"
            name="userName"
            placeholder="User Name..."
            {...register('userName')}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
          <label className="form-login-lable"></label>
          <input
            className="form-login-input"
            type="password"
            name="password"
            placeholder="Password..."
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            value="Sign In"
            type="submit"
            className="form-login-submitBtn"
            {...register('submit')}
          />
          <input
            value="Register Now"
            type="button"
            className="form-login-registerBtn"
            onClick={() => handleRegister()}
          />
          {message} <h4 id="message-after-login">{message}</h4>
        </form>
      </div>
    </>
  )
}
