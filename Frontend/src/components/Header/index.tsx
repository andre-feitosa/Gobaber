import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './index.css'
import logo from '../../assets/logo-purple.svg'
import Notification from '../notification/notification'
import { authUser } from '../../redux/actions/authActions'

const Header = () => {
  const selector = useSelector(authUser)
  
  const User = selector.payload.user.data.UserOne

  const UserPhoto = User.file !== null ? User.file.url : "https://placekitten.com/300/300" 

  return (
    <>
    <div className='container_header'>
      <div className='container_components'>
        <nav>
          <img src={logo} alt="gobaber-logo" className='image_logo'/>
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Notification/>
          <div className='profile'>
            <strong>{User.name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <img src={UserPhoto} alt="avatar"  className='image_avatar'/>
        </aside>
      </div>
    </div>
    </>
  )
}

export default Header