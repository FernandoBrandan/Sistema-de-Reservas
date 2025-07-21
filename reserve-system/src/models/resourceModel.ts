import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'
import { IResource } from '../interfaces/resourceInterface'

type ResourceCreationAttributes = Optional<IResource, 'id' | 'createdAt' | 'updatedAt'>

export class Resource extends Model<IResource, ResourceCreationAttributes> implements IResource {
    public id!: string
    public name!: string
    public type!: string
    public capacity!: number
    public isActive!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

}

Resource.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_active',
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at'
        }
    },
    {
        sequelize,
        modelName: 'Resource',
        tableName: 'resources',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
    }
)