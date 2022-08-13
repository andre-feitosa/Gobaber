import { fileModel } from '../models/files'

import { Request, Response } from 'express'

export const fileController = async (req: Request, res: Response) => {
    const name = req.file?.originalname
    const path = req.file?.filename

    const fileJson = await fileModel.create({
        name,
        path
    })

    return res.json(fileJson)
}