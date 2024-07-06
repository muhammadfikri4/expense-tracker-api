import { VerifyToken } from "app/middleware/token";
import { Router } from "express";
import { createCategoryController, getCategoryController } from "./categoryController";

const route = Router()

route.post("/", createCategoryController)
route.get("/", VerifyToken, getCategoryController)

export default route