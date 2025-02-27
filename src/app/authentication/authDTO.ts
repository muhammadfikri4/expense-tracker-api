import { Gender } from "@prisma/client"


export interface CategoryBodyDTO {

    id?: string
    name: string
    userId: string
}

export interface RegisterAuthBodyDTO {
    email: string
    password: string
    fullName: string
    gender?: Gender
    phoneNumber?: number

}

export interface LoginAuthBodyDTO {
    email: string
    password: string
}

export interface LoginAuthResponse {
    access_token: string
}