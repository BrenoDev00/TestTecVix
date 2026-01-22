import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";
import { authUser } from "../auth/authUser";
import { UserController } from "../controllers/UserController";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER;

export const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

userRoutes.get(BASE_PATH, authUser, userController.getUsers);
