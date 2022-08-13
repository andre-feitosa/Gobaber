import { Request, Response } from 'express'
import { startOfDay, endOfDay, setHours, setSeconds, setMinutes, format, isAfter } from 'date-fns'
import { Op } from 'sequelize'

import { appointmentModel } from '../models/appointment'

export const AvailableController = async (req: Request, res: Response) => {
    const { date } = req.query

    if(!date) {
        return res.json({err: "informe uma data"})
    }

    const SearchDate = Number(date)

    const appointment = await appointmentModel.findAll({
        where: {
            provider_id: req.params.providerId,
            canceled_at: null,
            date: {
                [Op.between]: [startOfDay(SearchDate), endOfDay(SearchDate)],
            }
        }
    })

    const schedule = [
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
    ]

    const available = schedule.map(time => {
        const [ hour, minutes ] = time.split(':')
        const value = setSeconds(setMinutes(setHours(SearchDate, Number(hour)), Number(minutes)) ,0)

        return {
            time,
            value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
            available: isAfter(value, new Date()) && !appointment.find(a => format(Number(a.date), 'HH:mm') == time)
        }
    })

    return res.json(available)
}