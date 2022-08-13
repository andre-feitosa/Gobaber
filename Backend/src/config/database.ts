import {Sequelize} from 'sequelize'

export const db = new Sequelize(
    "postgres",
    "postgres",
    "12345678",
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres"
    }
)