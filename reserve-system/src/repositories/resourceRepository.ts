import { Resource } from "../models/resourceModel"
import { IResource } from "../interfaces/resourceInterface"

export const create = async (resourceData: IResource): Promise<IResource> => {
    return await Resource.create(resourceData)
}

export const findById = async (id: string): Promise<IResource | null> => {
    return await Resource.findByPk(id)
}

export const findAll = async (): Promise<IResource[]> => {
    return await Resource.findAll({ where: { isActive: true }, order: [['name', 'ASC']] })
}

export const findByType = async (type: string): Promise<IResource[]> => {
    return await Resource.findAll({ where: { type, isActive: true }, order: [['name', 'ASC']] })
}