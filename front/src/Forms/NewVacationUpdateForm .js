import React, { useState, useContext } from 'react'
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

export const NewVacationUpdateForm = () => {
  const [message, setMessage] = useState('')
  const { setOpenNewVacationUpdateModal, updateData } = useContext(context)

  const {
    id,
    title,
    category,
    img_url,
    description,
    destination,
    price,
    date_start,
    date_end,
  } = updateData

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitUpdateForm = (data) => {
    const jwt = Cookies.get('token')
    axios
      .patch(`http://localhost:8080/update/${id}`, {
        withCredentials: true,
        headers: { authorization: `Bearer ${jwt}` },
        data,
      })
      .then(function (response) {
        setMessage(response.data)
        setTimeout(() => {
          setOpenNewVacationUpdateModal(false)
        }, 1500)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <div className="form-admin-container">
        <form className="admin-form" onSubmit={handleSubmit(submitUpdateForm)}>
          <FaWindowClose
            className="close-admin-modal-icon"
            onClick={() => setOpenNewVacationUpdateModal(false)}
          />
          <h3 className="form-admin-header">Update {id}</h3>
          <label className="form-admin-lable">Title : </label>
          <input
            defaultValue={title}
            className="admin-form-input"
            type="text"
            name="title"
            placeholder="Title..."
            {...register('title')}
          />
          {errors.title && <p>{errors.title.message}</p>}
          <label className="form-admin-lable">Category : </label>
          <input
            defaultValue={category}
            className="admin-form-input"
            type="text"
            name="category"
            placeholder="Category..."
            {...register('category')}
          />
          {errors.category && <p>{errors.category.message}</p>}
          <label className="form-admin-lable">Description : </label>
          <textarea
            defaultValue={description}
            className="admin-form-input"
            type="text"
            name="description"
            placeholder="Description..."
            {...register('description')}
          />
          {errors.description && <p>{errors.description.message}</p>}
          <label className="form-admin-lable">Destination : </label>
          <input
            defaultValue={destination}
            className="admin-form-input"
            type="text"
            name="destination"
            placeholder="Destination..."
            {...register('destination')}
          />
          {errors.destination && <p>{errors.destination.message}</p>}
          <label className="form-admin-lable">Img_url : </label>
          <textarea
            className="admin-form-input"
            defaultValue={img_url}
            type="text"
            name="img_url"
            placeholder="Img_url..."
            {...register('img_url')}
          />
          {errors.img_url && <p>{errors.img_url.message}</p>}
          <label className="form-admin-lable">Date Start :</label>
          <input
            className="admin-form-input"
            defaultValue={date_start.slice(0, date_start.length - 14)}
            type="date"
            name="date_start"
            {...register('date_start')}
          />
          {errors.date_start && <p>{errors.date_start.message}</p>}
          <label className="form-admin-lable">Date Start :</label>
          <input
            className="admin-form-input"
            defaultValue={date_end.slice(0, date_start.length - 14)}
            type="date"
            name="date_end"
            {...register('date_end')}
          />
          {errors.date_end && <p>{errors.date_end.message}</p>}
          <label className="form-admin-lable">Price :</label>
          <input
            className="admin-form-input"
            defaultValue={price}
            type="text"
            name="price"
            placeholder="Price... $"
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
