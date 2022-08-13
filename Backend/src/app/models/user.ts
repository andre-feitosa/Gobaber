import { DataTypes, Model } from "sequelize"
import { fileModel } from './files'
import { db } from "../../config/database"

export interface UserInstance extends Model {
    id: string,
    name: string,
    email: string
    password_hash: string,
    provider: boolean
}
const userModel = db.define<UserInstance>("users", {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    provider: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }},
    {
        timestamps: false
    })

    userModel.belongsTo(fileModel, {
        constraints: true,
        foreignKey: 'avatar_id'
    })

    //CREATE TABLE users(id varchar primary key not null, name varchar(100) not null, email varchar(100) not null, password_hash varchar(100) not null, provider boolean not null DEFAULT false);

export { userModel }