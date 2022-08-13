import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import './index.css'
import Header from '../../components/Header/index'
import { Avatar } from './avatar/index'
import { singOut } from '../../redux/actions/userActions'
import { authUser } from '../../redux/actions/authActions'

const Profile = () => {

    const selector = useSelector(authUser)
    const dispatch = useDispatch()

    const token = selector.payload.user.data.token

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const submitForm = async (ev: any) => {
        ev.preventDefault()

        const configPassword = (ev.target[2].value == '') ? ev.target[1].value : ev.target[2].value

        if(ev.target[2].value !== ev.target[3].value) {
            toast.error("As duas senhas não são iguais!")
        }

        let UserRequest = await axios.put('http://localhost:2000/update', {
            name: ev.target[0].value,
            password: ev.target[1].value, 
            newPassword: configPassword,
            avatar_id: selector.payload.img
        }, config)

        UserRequest.data.error ? toast.error("Voce erro o seu Nome ou sua Senha!") : toast.success("Seu perfil foi atualizado com sucesso!")
    }

    const singLogin = () => {
        dispatch(singOut())
        dispatch(authUser(false))
    }

    return (
        <div>
            <Header />
            <div className="container_profile">
                <Avatar />
                <form onSubmit={submitForm}>
                    <input type="text" placeholder='Coloque seu nome'/>
                    <input type="password" placeholder='Coloque sua senha'/>

                    <hr />

                    <input type="password" placeholder='Coloque sua nova senha'/>
                    <input type="password" placeholder='Repita sua nova senha'/>

                    <button type="submit">Atualizar Perfil</button>
                </form>

            <button onClick={()=>{singLogin()}}>Sair do Gobaber</button>
        </div>
    </div>
  )
}

export default Profile