import { Request } from "express";
import { prisma } from "../database/client";
import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserLogin } from "../types/validations/User/userLogin";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { genToken } from "../utils/jwt";

export class UserService {
  private readonly userModel = new UserModel();

  listAll = async (query: unknown) => {
    const validQuery = querySchema.parse(query);

    return this.userModel.findAll(validQuery);
  };

  listById = async (userId: string) => {
    const searchedUser = await this.userModel.findById(userId);

    if (!searchedUser)
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);

    return searchedUser;
  };

  getNewUserToken = async (req: Request) => {
    const idUser = req.params.id as string;

    const searchedUser = await this.listById(idUser);

    const accessToken = genToken({ idUser: searchedUser.idUser });

    return accessToken;
  };

  createNewUser = async (userData: TUserCreated) => {
    const createdUser = await this.userModel.create(userData);

    return createdUser;
  };

  verifyIfUserNameAlreadyExists = async (userName: string) => {
    const userNameAlreadyExists = await prisma.user.findFirst({
      where: {
        username: userName,
      },
    });

    return userNameAlreadyExists;
  };

  listByLoginEmail = async (loginData: TUserLogin) => {
    const searchedUser = await this.userModel.findByLoginEmail(loginData);

    return searchedUser;
  };
}
