import { Router } from "express";
import { VerifyToken } from "../middleware/token";
import { createCategoryController, getCategoryController } from "./categoryController";

const route = Router()

route.post("/", createCategoryController)
route.get("/", VerifyToken, getCategoryController)

export default route