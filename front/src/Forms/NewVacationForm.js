import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FaWindowClose } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { context } from '../App'
import Cookies from 'js-cookie'

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  destination: yup.string().required(),
  img_url: yup.string().required(),
  date_start: yup.string().required(),
  date_end: yup.string().required(),
  price: yup.number().required(),
})

export const NewVacationForm = () => {
  const { setOpenNewVacationModal } = useContext(context)
  const [message, setMessage] = useState('')
  const [data, setData] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    const jwt = Cookies.get('token')
    axios
      .post('http://localhost:8080/new', {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
        data,
      })
      .then(function (response) {
        setData(response)
        setMessage(response.data)
        setTimeout(() => {
          setOpenNewVacationModal(false)
        }, 1500)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {}, [data])

  return (
    <>
      <div className="form-admin-container">
        <form className="admin-form" onSubmit={handleSubmit(submitForm)}>
          <FaWindowClose
            className="close-admin-modal-icon"
            onClick={() => setOpenNewVacationModal(false)}
          />
          <h3 className="form-admin-header">Add Vacation</h3>
          <label className="form-admin-lable">Title : </label>
          <input
            type="text"
            name="title"
            className="admin-form-input"
            {...register('title')}
          />
          {errors.title && <p>{errors.title.message}</p>}
          <label className="form-admin-lable">Category : </label>
          <input
            type="text"
            name="category"
            className="admin-form-input"
            {...register('category')}
          />
          {errors.category && <p>{errors.category.message}</p>}
          <label className="form-admin-lable">Description : </label>
          <textarea
            className="admin-form-textarea"
            type="text"
            name="description"
            {...register('description')}
          />
          {errors.description && <p>{errors.description.message}</p>}
          <label className="form-admin-lable">Destination : </label>
          <input
            className="admin-form-textarea"
            type="text"
            name="destination"
            {...register('destination')}
          />
          {errors.destination && <p>{errors.destination.message}</p>}
          <label className="form-admin-lable">Img_url : </label>
          <textarea
            className="admin-form-textarea"
            type="text"
            name="img_url"
            {...register('img_url')}
          />
          {errors.img_url && <p>{errors.img_url.message}</p>}
          <label className="form-admin-lable">Date Start :</label>
          <input
            className="admin-form-input"
            type="date"
            name="date_start"
            {...register('date_start')}
          />
          {errors.date_start && <p>{errors.date_start.message}</p>}
          <label className="form-admin-lable">Date Start :</label>
          <input
            className="admin-form-input"
            type="date"
            name="date_end"
            {...register('date_end')}
          />
          {errors.date_end && <p>{errors.date_end.message}</p>}
          <label className="form-admin-lable">Price $:</label>
          <input
            type="text"
            name="price"
            className="admin-form-input"
            {...register('price')}
          />
          {errors.price && <p>{errors.price.message}</p>}
          <input
            type="submit"
            className="submit-admin-form"
            {...register('submit')}
          />
          {message} && <h4 id="message-after-admin-submission">{message}</h4>
        </form>
      </div>
    </>
  )
}
