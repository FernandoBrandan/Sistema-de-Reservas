import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'
import { IUser } from '../interfaces/userInterface'

type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: string
    public email!: string
    public name!: string
    public isActive!: boolean

    public createdAt!: Date
    public updatedAt!: Date
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
        underscored: true,
    }
)