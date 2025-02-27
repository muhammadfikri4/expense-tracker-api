import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse, RegisterAuthBodyDTO } from "./authDTO";
import { loginService, registerService } from "./authService";

export const registerController = async (req: Request, res: Response) => {

    const { email, fullName, password, gender, phoneNumber, } = req.body as RegisterAuthBodyDTO

    const register = await registerService({ email, fullName, password, gender, phoneNumber, });

    if ((register as HttpError)?.message) {
        return HandleResponse(res, (register as HttpError).statusCode, (register as HttpError).code, (register as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.USER.ACCOUNT)
}



export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.USER.EMAIL)
    }

    if (!password) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD)
    }

    const login = await loginService({ email, password });
    if ((login as HttpError)?.message) {
        return HandleResponse(res, (login as HttpError).statusCode, (login as HttpError).code, (login as HttpError).message)
    }
    // res.cookie("access_token", login, { httpOnly: true })
    HandleResponse<LoginAuthResponse>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER, { access_token: login as string })
}