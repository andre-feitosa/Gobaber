import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Navigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import './index.css'
import { authUser } from '../../redux/actions/authActions'
import logo from '../../assets/logo.svg'
import { singInRequest } from '../../redux/actions/userActions'

const Singin = () => {
  const [checkEmail, checkEmailState] = useState(false)
  const [checkPassword, checkPasswordState] = useState(false)

  const dispatch = useDispatch()

  async function handleSubmit(data: any) {
    data.preventDefault()

    let UserRequest = await axios.post('http://localhost:2000/jwt', {
      name: data.target[0].value,
      password: data.target[1].value
    })

    dispatch(singInRequest(UserRequest))
    
    if(UserRequest.status == 201) {
      toast.error("VOCE ERROU SENHA / NOME")
      dispatch(authUser(false))
    } else {
      dispatch(authUser(true))
      window.open('http://localhost:3000/dashboard', "_self")
    }
  }

  return (
    <>
      <img src={logo} alt="GoBaber logo" className='logo_gobaber'/>
      <div className="container_login">
        <form action='/dashboard' onSubmit={handleSubmit}>
          <input type="text" placeholder="Seu nome" onChange={(e: any)=>{e.target.value == '' ? checkEmailState(true) : checkEmailState(false)}}/>
          {checkEmail ? <p>O NOME NAO PODE ESTAR VAZIO</p> : null}
          
          <input type="password" placeholder="Sua senha" onChange={(e: any)=>{e.target.value == '' ? checkPasswordState(true) : checkPasswordState(false)}}/>
          {checkPassword ? <p>A SENHA NAO PODE ESTAR VAZIA</p> : null}

          <button type="submit">Acessar</button>

          <Link to="register" className='linkCadast'>Cadastra-se</Link>
        </form>
      </div>
    </>
  )
}

export default Singin