import { DataTypes, Model } from "sequelize"
import { db } from "../../config/database"

export interface FileInstance extends Model {
    id: string,
    name: string,
    path: string
}

export const fileModel = db.define<FileInstance>("files", {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    url: {
        type: DataTypes.VIRTUAL,
        get() {
            return `http://localhost:2000/files/${this.path}`
        },
    }
},
    {
        timestamps: false
    }
)
