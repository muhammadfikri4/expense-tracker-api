import { Gender } from "@prisma/client"

export interface UserModelTypes {
    id: string
    name: string,
    email: string,
    password: string,
    phoneNumber: string
    gender: Gender
}