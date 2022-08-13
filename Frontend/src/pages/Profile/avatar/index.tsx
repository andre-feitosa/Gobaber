import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormData from 'form-data'
import axios from 'axios'

import './index.css'
import { URLIMG } from '../../../redux/actions/urlimg'
import { authUser } from '../../../redux/actions/authActions'
import { toast } from 'react-toastify'

const Avatar = () => {

    const selector = useSelector(authUser)
    const dispatch = useDispatch()

    const token = selector.payload.user.data.token
    const User = selector.payload.user.data.UserOne

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const formdata = new FormData() 

    const UserPhoto = User.file !== null ? User.file.url : "https://placekitten.com/300/300"

    const [ avatarPhoto, avatarState ] = useState(UserPhoto)

    async function handleChange(data: any)  {
        const file = data.target.files[0]

        formdata.append("file", file)

        const URLimage = await axios.post("http://localhost:2000/files", formdata, config)

        toast.info("Clique em 'Atualizar perfil', para atualizar a sua foto!")

        avatarState(URLimage.data.url)
        dispatch(URLIMG(URLimage))
    }

  return (
    <div className='container_avatar'>
        <label htmlFor="avatar">
            <img src={avatarPhoto} alt="" />

            <input type="file" accept='image/*' id="avatar" onChange={handleChange}/>
        </label>
    </div>
  )
}

export { Avatar }