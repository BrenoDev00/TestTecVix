import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { AuthController } from "../controllers/AuthController";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AUTH; // /api/v1/brand-master

export const authRoutes = Router();

export const makeAuthController = () => {
  return new AuthController();
};

const authController = makeAuthController();

authRoutes.post(`${BASE_PATH}/register`, authController.postRegister);
