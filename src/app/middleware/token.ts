import { NextFunction, type Request, type Response } from "express";
import { verify } from 'jsonwebtoken';
import { ENV } from "../../libs";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGES } from "../../utils/Messages";

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return HandleResponse(res, 403, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    verify(token, ENV.JWT_SECRET as string, (err) => {
        if (err) {

            return HandleResponse(res, 403, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.AUTH)
        }
        next()
    })


}