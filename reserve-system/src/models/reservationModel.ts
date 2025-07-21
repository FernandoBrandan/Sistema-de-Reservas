import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'
import { IReservation, ReservationStatus } from '../interfaces/reservationInterface'

type ReservationCreationAttributes = Optional<IReservation, 'id' | 'correlationId' | 'createdAt' | 'updatedAt'>

export class Reservation extends Model<IReservation, ReservationCreationAttributes> implements IReservation {
    public id!: string
    public resourceId!: string
    public userId!: string
    public startDate!: Date
    public endDate!: Date
    public status!: ReservationStatus
    public correlationId!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date


    public isActive(): boolean {
        return this.status === ReservationStatus.CONFIRMED
    }

    public isPending(): boolean {
        return this.status === ReservationStatus.PENDING
    }

    public isCancelled(): boolean {
        return this.status === ReservationStatus.CANCELLED
    }

    public isExpired(): boolean {
        return this.status === ReservationStatus.EXPIRED
    }

    public isCurrentlyActive(): boolean {
        const now = new Date()
        return this.status === ReservationStatus.CONFIRMED &&
            this.startDate <= now &&
            this.endDate >= now
    }
}

Reservation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        resourceId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'resource_id'
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_id'
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_date'
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'end_date'
        },
        status: {
            type: DataTypes.ENUM(
                ReservationStatus.PENDING,
                ReservationStatus.CONFIRMED,
                ReservationStatus.CANCELLED,
                ReservationStatus.EXPIRED
            ),
            allowNull: false,
            defaultValue: ReservationStatus.PENDING
        },
        correlationId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            field: 'correlation_id'
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
        modelName: 'Reservation',
        tableName: 'reservations',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['resource_id']
            },
            {
                fields: ['user_id']
            },
            {
                fields: ['status']
            },
            {
                fields: ['start_date', 'end_date']
            },
            {
                fields: ['correlation_id']
            }
        ]
    }
)