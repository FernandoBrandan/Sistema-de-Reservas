export interface IResource {
    id?: string
    name: string
    type: string
    capacity: number
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}


/**
    const mapToResource = (row: any): Resource => {
        return {
            id: row.id,
            name: row.name,
            type: row.type,
            capacity: row.capacity,
            isActive: row.is_active,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }
    } 
*/