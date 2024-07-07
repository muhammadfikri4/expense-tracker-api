import dotenv from 'dotenv'
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

export const getCategoryService = async ({ userId }: IFilterCategory) => {
    if (!userId) {
        return AppError(MESSAGES.ERROR.REQUIRED.USER_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const getUser = await getUserById(userId)
    if (!getUser) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const getCategoryByUser = await getCategoryByUserId({ userId })
    const getCategoryByKey = await getDefaultCategory()
    const category = [...getCategoryByKey, ...getCategoryByUser]

    return category
}