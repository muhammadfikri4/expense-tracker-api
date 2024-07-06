import { Users } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { AppError } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getUserByEmail, getUserById } from "../authentication/authRepository"
import { CategoryBodyDTO, LoginAuthBodyDTO } from "./categoryDTO"



export const createCategoryValidate = async ({ name, userId }: CategoryBodyDTO) => {

    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!userId) {
        return AppError(MESSAGES.ERROR.REQUIRED.USER_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const user = await getUserById(userId as string)
    if (!user) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }
}
export const loginValidate = async ({ email, password }: LoginAuthBodyDTO) => {
    const user = await getUserByEmail(email)
    if (!user) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, MESSAGE_CODE.UNAUTHORIZED)
    }
    return user as Users
}