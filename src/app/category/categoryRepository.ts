import prisma from "../../config";
import { CategoryBodyDTO } from "../authentication/authDTO";
import { IFilterCategory } from "./categoryTypes";

export const createCategory = async ({ name, userId }: CategoryBodyDTO) => {
    return await prisma.category.create({
        data: {
            name,
            userId
        }
    })
}

export const getCategoryByUserId = async ({ userId }: IFilterCategory) => {
    return await prisma.category.findMany({
        where: {
            userId,
            AND: {
                key: null
            }
        },
        include: {
            users: {
                select: {
                    id: true,
                    fullName: true
                }
            }
        }
    })
}
export const getDefaultCategory = async () => {
    return await prisma.category.findMany({
        where: {
            key: "Default"
        }
    })
}



export const getCategoryCount = async ({ userId }: IFilterCategory) => {
    return await prisma.category.count({
        where: {
            userId
        }
    })
}