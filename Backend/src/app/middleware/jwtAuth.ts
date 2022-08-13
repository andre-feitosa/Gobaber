import { NextFunction, Request, Response } from 'express'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import {authJson} from '../../config/auth'


interface jwtPayload {
  id: string
}

export const jwtAuth = async (req: Request, res: Response, next: NextFunction ) => {
    const tokenAuth = req.headers.authorization

    if(!tokenAuth) {
        return res.json({err: "token invalido"})
    }

    const [, token] = tokenAuth.split(' ')

    try {
        var {id} = jwt.verify(token, authJson.secret) as jwtPayload

        req.userId = id

        return next()
    }catch(err) {
        console.log(err)

        return res.json({err: "error for jwt"})
    }
} 