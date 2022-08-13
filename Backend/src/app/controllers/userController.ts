import { userModel } from '../models/user'

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid';

export const registerUser = async (req: Request, res: Response) => {

    let { name, password, email } = req.body

    const UserOne = await userModel.findOne({
        where: {name: name}
    })

    if(UserOne) {
        return res.status(201).json({error: "esse user ja existe"})
    }

    const criptoPassword = await bcrypt.hash(password, 7)

    const usercreate = await userModel.create({
        name: name,
        email: email,
        password_hash: criptoPassword
    })

    return res.json(usercreate)
}

export const updateUser = async (req: Request, res: Response) => {
    let { name, password, newPassword, avatar_id } = req.body

    const UserOne = await userModel.findOne({
        where: {name: name}
    })    

    if(!UserOne) {
        return res.status(201).json({error: "esse user nao existe"})
    }

    if (!(await bcrypt.compare(password, UserOne.password_hash))) {
        return res.status(201).json({error: "Voce errou a senha tente de novo"})
    }

    const criptoPassword = await bcrypt.hash(newPassword, 7) 

    await UserOne?.update({password_hash: criptoPassword, avatar_id: avatar_id})
    
    return( res.json({"msg": "Seu perfil foi atualizado com sucesso"}))
}