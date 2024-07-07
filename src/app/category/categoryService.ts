import dotenv from 'dotenv'
import { decode } from 'jsonwebtoken'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { getUserById } from '../authentication/authRepository'
import { CategoryBodyDTO } from './categoryDTO'
import { createCategory, getCategoryByUserId, getDefaultCategory } from './categoryRepository'
import { IFilterCategory } from './categoryTypes'
import { createCategoryValidate } from './categoryValidate'

dotenv.config()

export const createCategoryService = async ({ name, userId }: CategoryBodyDTO) => {
    const category = await createCategoryValidate({ name, userId })
    if ((category as HttpError)?.message) {
        return AppError((category as HttpError).message, (category as HttpError).statusCode, (category as HttpError).code)
    }

    return await createCategory({ name, userId })
}

export const getCategoryService = async (token: string) => {
    const decodeToken = decode(token)
    if (!(decodeToken as IFilterCategory)?.userId) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER_ID, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const getUser = await getUserById((decodeToken as IFilterCategory)?.userId as string)
    if (!getUser) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const getCategoryByUser = await getCategoryByUserId({ userId: (decodeToken as IFilterCategory).userId })
    const getCategoryByKey = await getDefaultCategory()
    const category = [...getCategoryByKey, ...getCategoryByUser]

    return category
}