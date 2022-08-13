import { Console } from 'console'
import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

import logo from '../../assets/logo.svg'

import '../Signin/index.css'

const Singup = () => {

  var arrayTable: any[] = []

  const handleSubmit = (event: any) => {

    for(let i=0; i<3; i++) {
      arrayTable.push(event.target[i].value)
    }

    axios.post('http://localhost:2000/', {
      name: arrayTable[0], 
      password: arrayTable[2], 
      email: arrayTable[1]
    }).then(res=>{res.status == 201 ? toast.error("Esse nome ja esta sendo utilizado"):toast.success("Usuario criado com sucesso")})

    event.preventDefault();
  }

  return (
    <>
      <img src={logo} alt="GoBaber logo" className='logo_gobaber'/>
      <div className="container_login">
        <form action="" onSubmit={handleSubmit}>
          <input placeholder="Nome Completo" />
          <input type="email" placeholder="Seu e-mail" />
          <input type="password" placeholder="Sua senha"/>
          <button type="submit">Criar Conta</button>

          <Link to="/" className='linkCadast'>Fazer Login</Link>
        </form>
      </div>
    </>
  )
}

export default Singup
