import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FaWindowClose } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { context } from '../App'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup.string().required(),
  password: yup.string().min(4).max(4).required(),
  passwordVerification: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password verification is required'),
})
export const RegisterModal = () => {
  const {
    setOpenLoginModal,
    setOpenRegisterModal,
  } = useContext(context)

  const [message, setMessage] = useState('')
  const createUser = (event) => {
    event.preventDefault()
    let formData = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      userName: event.target[2].value,
      password: event.target[3].value,
      passwordVerification: event.target[4].value,
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitRegister = (data) => {
    axios
      .post('http://localhost:8080/register/', {
        data,
      })
      .then(function (response) {
        setMessage(response.data)

        setTimeout(() => {
          setOpenRegisterModal(false)
          setOpenLoginModal(true)
        }, 1500)
      })
      .catch(function (error) {
        setMessage(error.response.data)
      })
  }

  useEffect(() => {}, [])

  return (
    <>
      <div id="form-register-container">
        <form id="form-register" onSubmit={handleSubmit(submitRegister)}>
          <FaWindowClose
            id="form-register-closeModal-icon"
            onClick={() => setOpenRegisterModal(false)}
          />
          <h3 id="form-register-header">Register</h3>
          <label className="form-register-lable"></label>
          <input
            className="form-register-input"
            type="text"
            name="firstName"
            placeholder="First Name "
            {...register('firstName')}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <label className="form-register-lable"></label>
          <input
            className="form-register-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            {...register('lastName')}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <label className="form-register-lable"></label>
          <input
            className="form-register-input"
            type="text"
            name="userName"
            placeholder="User Name"
            {...register('userName')}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
          <label className="form-register-lable"></label>
          <input
            className="form-register-input"
            type="password"
            name="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label className="form-register-lable"></label>
          <input
            className="form-register-input"
            type="password"
            name="passwordVerification"
            placeholder="Password Verification"
            {...register('passwordVerification')}
          />
          {errors.passwordVerification && (
            <p>{errors.passwordVerification.message}</p>
          )}
          <input
            id="form-register-submitBtn"
            value="Register"
            type="submit"
            {...register('submit')}
          />
          {message} && <h4 id="message-after-register">{message}</h4>
        </form>
      </div>
    </>
  )
}
