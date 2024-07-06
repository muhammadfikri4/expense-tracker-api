import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { CategoryBodyDTO } from "../authentication/authDTO";
import { } from "../authentication/authService";
import { createCategoryService, getCategoryService } from "./categoryService";
import { CategoryModelTypes } from "./categoryTypes";

export const createCategoryController = async (req: Request, res: Response) => {

    const { name, userId } = req.body as CategoryBodyDTO

    const category = await createCategoryService({ name, userId });

    if ((category as HttpError)?.message) {
        return HandleResponse(res, (category as HttpError).statusCode, (category as HttpError).code, (category as HttpError).message)
    }


    return HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.CATEGORY)
}

export const getCategoryController = async (req: Request, res: Response) => {
    try {
        // const { userId } = req.body
        const userId = req.headers['user-id']
        const category = await getCategoryService({
            userId: userId as string,

        })
        if ((category as HttpError)?.message) {
            return HandleResponse(res, (category as HttpError).statusCode, (category as HttpError).code, (category as HttpError).message)
        }

        if ((category as unknown as CategoryModelTypes[])?.length < 1) {
            return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.CATEGORY, category)
        }


        return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.CATEGORY.GET, category)
    } catch (error) {
        console.log(error)
        return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
    }
}