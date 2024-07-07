import { Users } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { ENV } from '../../libs'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { LoginAuthBodyDTO, RegisterAuthBodyDTO } from './authDTO'
import { getUserByEmail, registerRepository } from './authRepository'
import { loginValidate } from './authValidate'

dotenv.config()


export const registerService = async ({ email, fullName, gender, phoneNumber, password }: RegisterAuthBodyDTO) => {

    const validate = await registerValidate({ email, fullName, password, gender })

    if (validate?.message) {
        return AppError(validate.message, validate.statusCode, validate.code)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const response = await registerRepository({ email, fullName, gender, phoneNumber, password: hashPassword })
    return response

}

export const registerValidate = async ({ email, fullName, gender, password }: RegisterAuthBodyDTO) => {

    if (!fullName) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (typeof gender !== 'undefined' && gender !== 'Woman' && gender !== 'Man') {
        return AppError(MESSAGES.ERROR.INVALID.USER.GENDER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!email) {
        return AppError(MESSAGES.ERROR.REQUIRED.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)

    }
    if (!password) {
        return AppError(MESSAGES.ERROR.REQUIRED.PASSWORD, 400, MESSAGE_CODE.BAD_REQUEST)

    }

    if (!REGEX.email.test(email)) {
        return AppError(MESSAGES.ERROR.INVALID.USER.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const user = await getUserByEmail(email as string)
    if (user) {
        return AppError(MESSAGES.ERROR.ALREADY.USER.ACCOUNT, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (password.length < 8) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}

export const loginService = async (
    { email, password }: LoginAuthBodyDTO
) => {

    const user = await loginValidate({ email, password })
    if ((user as HttpError)?.message) {
        return AppError((user as HttpError).message, (user as HttpError).statusCode, (user as HttpError).code)
    }

    const users = user as Users

    const token = jwt.sign({
        userId: users.id,

    }, ENV.JWT_SECRET as string)

    return token

}