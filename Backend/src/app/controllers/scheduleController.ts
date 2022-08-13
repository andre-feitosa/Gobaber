import {appointmentModel} from '../models/appointment' 
import { userModel } from '../models/user'

import { Request, Response } from 'express'
import { Op } from 'sequelize'
import * as yup from 'yup'
import { fileModel } from '../models/files'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

export const scheduleController = async (req: Request, res: Response) => {
    const { user } = req.body
    const { date } = req.query

    const parseDate = parseISO(String(date))

    const checkUser = await userModel.findOne({
        where: { id: user, provider: true }
    })

    if(!checkUser) {
        return res.json({err: "usuario nao e um admin"})
    }

    const appointments = await appointmentModel.findAll({
        where: {
            provider_id: user,
            canceled_at: null,
            date: {
                [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
            }
        },
        order: ['date']
    })

    return res.json(appointments)
}