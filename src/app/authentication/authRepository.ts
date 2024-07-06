import prisma from "../../config";
import { RegisterAuthBodyDTO } from "./authDTO";

export const registerRepository = async ({ email, password, fullName, gender, phoneNumber }: RegisterAuthBodyDTO) => {
    return await prisma.users.create({
        data: {
            email,
            password,
            fullName,
            gender,
            phoneNumber: phoneNumber?.toString()
        }
    })
}

export const getUserById = async (id: string) => {
    return await prisma.users.findUnique({
        where: {
            id
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.users.findFirst({
        where: {
            email
        }
    })
}