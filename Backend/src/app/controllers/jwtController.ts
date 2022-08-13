import { userModel } from '../models/user'
import { fileModel } from '../models/files'

import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

export const jwtController = async (req: Request, res: Response) => {
    const { name, password } = req.body

    const UserOne = await userModel.findOne({
        where: {name: name},
        include: [{
            model: fileModel
        }]
    })

    if (!UserOne) {
        return res.status(201).json({error: "esse user nao existe"})
    }

    if (!(await bcrypt.compare(password, UserOne.password_hash))) {
        return res.status(201).json({error: "Voce errou a senha tente de novo"})
    }

    const {id} = UserOne

    return res.json({ 
        UserOne,
        token: jwt.sign({id}, '96a767bd7dbf40eb5d3f88cde813b23d', {
            expiresIn: '10d'
        })
    })
}
