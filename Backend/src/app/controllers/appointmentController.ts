import {appointmentModel} from '../models/appointment' 
import { userModel } from '../models/user'

import { Request, Response } from 'express'
import { startOfHour, parseISO, isBefore } from 'date-fns'
import * as yup from 'yup'
import { fileModel } from '../models/files'

export const appointmentController = async (req: Request, res: Response) => {
    
    const {user_id, provider_id, date } = req.body

    const shema = yup.object().shape({
        provider_id: yup.number().required(),
        date: yup.date().required()
    })

    if(!(await shema.isValid(req.body))) {
        return res.json({err: "Verifique as informaçoes colocadas"})
    }

    const userProvider = await userModel.findOne({
        where: {id: provider_id, provider: true}
    })

    if(!userProvider) {
        return res.json({err: "Este usuario nao existe ou nao e um provedor"})
    }

    const hourStart = startOfHour(parseISO(date))

    const dataBrasil = date.toLocaleString('pt-BR', { timeZoneName: 'longOffset', timeZone: 'America/Rio_Branco' })

    const calendario = new Date(dataBrasil).toString();

    console.log(calendario)

    if(isBefore(hourStart, new Date())) {
        return res.json({err: "essa data nao e permitida"})
    }
 
    const checkAvailabity = await appointmentModel.findOne({
        where: {
            provider_id,
            canceled_at: null,
            date: calendario
        }
    })

    if(checkAvailabity) {
        return res.json({err: "esse barbeiro ja tem um agendamento nesse horario"})
    }

    const createAppointment = await appointmentModel.create({
        user_id,
        provider_id,
        date: calendario
    })

    return res.json(createAppointment)
}

export const appointmentGet = async (req: Request, res: Response) => {
    //const {page = 1} = req.query
    
    //const teste = req.userId
    //console.log(teste)

    const appointments = await appointmentModel.findAll({
        where: {
            canceled_at: null
        },
        order: ['date'],
        limit: 20,
        // offset: (Number(page) - 1) * 20,
        include: [
            {
                model: userModel, 
                as: 'provider',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: fileModel,
                        attributes: ['id', 'url', 'path']
                    }
                ]
            }
        ]
    })

    return res.json(appointments)
}
