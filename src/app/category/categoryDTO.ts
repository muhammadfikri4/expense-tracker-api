


export interface CategoryBodyDTO {

    id?: string
    name: string
    userId: string
}

export interface LoginAuthBodyDTO {
    email: string
    password: string
}

export interface LoginAuthResponse {
    access_token: string
}