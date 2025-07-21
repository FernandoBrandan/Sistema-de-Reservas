import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'
import { ITransactionContext, TransactionStatus, TransactionType } from '../interfaces/transactionInterface'

type TransactionContextCreationAttributes = Optional<ITransactionContext, 'createdAt' | 'updatedAt'>

export class TransactionContext extends Model<ITransactionContext, TransactionContextCreationAttributes> implements ITransactionContext {
    public correlationId!: string
    public transactionType!: TransactionType
    public status!: TransactionStatus
    public payload!: any
    public timeoutAt?: Date

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    public isInProgress(): boolean {
        return this.status === TransactionStatus.IN_PROGRESS
    }

    public isCompleted(): boolean {
        return this.status === TransactionStatus.COMPLETED
    }

    public isFailed(): boolean {
        return this.status === TransactionStatus.FAILED
    }

    public isTimeout(): boolean {
        return this.status === TransactionStatus.TIMEOUT
    }

    public isExpired(): boolean {
        return this.timeoutAt ? new Date() > this.timeoutAt : false
    }

    public canTimeout(): boolean {
        return this.status === TransactionStatus.IN_PROGRESS && this.isExpired()
    }
}

TransactionContext.init(
    {
        correlationId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'correlation_id'
        },
        transactionType: {
            type: DataTypes.ENUM(
                TransactionType.MAKE_RESERVATION,
                TransactionType.CANCEL_RESERVATION
            ),
            allowNull: false,
            field: 'transaction_type'
        },
        status: {
            type: DataTypes.ENUM(
                TransactionStatus.IN_PROGRESS,
                TransactionStatus.COMPLETED,
                TransactionStatus.FAILED,
                TransactionStatus.TIMEOUT
            ),
            allowNull: false,
            defaultValue: TransactionStatus.IN_PROGRESS
        },
        payload: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        timeoutAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'timeout_at'
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
        modelName: 'TransactionContext',
        tableName: 'transaction_contexts',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['status'] },
            { fields: ['transaction_type'] },
            { fields: ['timeout_at'] },
            { fields: ['created_at'] }
        ]
    }
)