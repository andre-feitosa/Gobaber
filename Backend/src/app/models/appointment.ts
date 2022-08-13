import { DataTypes, Model } from "sequelize"
import { isBefore } from 'date-fns'

import { db } from "../../config/database"
import { userModel } from './user'

export interface appointmentInstance extends Model {
    id: string,
    date: string,
    canceled_at: string
}

const appointmentModel = db.define<appointmentInstance>("appointment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    canceled_at: {
        type: DataTypes.DATE
    },
    past: {
        type: DataTypes.VIRTUAL,
        get() {
            return isBefore(Number(this.date), new Date())
        }
    }},
    {
        timestamps: false,
        freezeTableName: true
    }
)

appointmentModel.belongsTo(userModel, {
    constraints: true,
    foreignKey: 'user_id',
    as: 'user'
})
appointmentModel.belongsTo(userModel, {
    foreignKey: 'provider_id',
    as: 'provider'
})

export { appointmentModel}