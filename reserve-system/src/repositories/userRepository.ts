import { User } from "../models/userModel"
import { IUser } from "../interfaces/userInterface"

export const findById = async (id: string): Promise<IUser | null> => {
    return User.findOne({ where: { id } })
}

export const findByEmail = async (email: string): Promise<IUser | null> => {
    const query = "SELECT * FROM users WHERE email = $1"
    return User.findOne({ where: { email } })
}

export const create = async (user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<IUser> => {
    return User.create(user)
}

export const all = async (): Promise<IUser[]> => {
    return User.findAll()
}