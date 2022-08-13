import { Request, Response } from 'express'
import { fileModel } from '../models/files'

const { userModel } = require('../models/user');

export const providerController = async (req: Request, res: Response) => {
    const teste = await userModel.findAll({
        where: {provider: true},
        attributes: ['id', 'name', 'provider'],
        include: [
            {
                model: fileModel,
                attributes: ['id', 'name', 'url']
            }
        ]
    });

    return res.json(teste)
}
