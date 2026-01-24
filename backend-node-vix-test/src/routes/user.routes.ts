import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { UserController } from "../controllers/UserController";
import { isAdmin } from "../auth/isAdmin";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER;

export const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

userRoutes.get(`${BASE_PATH}/access`, authUser, userController.getUsers);

userRoutes.get(
  `${BASE_PATH}/token/:idUser`,
  authUser,
  userController.getUserToken,
);

userRoutes.post(
  BASE_PATH,
  authUser,
  isManagerOrIsAdmin,
  userController.postCreateUser,
);

userRoutes.put(
  `${BASE_PATH}/lastLoginDate/:idUser`,
  authUser,
  userController.putLastLoginDate,
);

userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  isAdmin,
  userController.deleteUser,
);
