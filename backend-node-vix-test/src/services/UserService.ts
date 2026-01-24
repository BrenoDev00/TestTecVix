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
import { userCreatedSchema } from "../types/validations/User/createUser";
import { BrandMasterService } from "./BrandMasterService";
import { EmailService } from "./EmailService";
import { hash } from "bcryptjs";
import { userUpdatedSchema } from "../types/validations/User/updateUser";

export class UserService {
  private readonly userModel = new UserModel();
  private readonly brandMasterService = new BrandMasterService();
  private readonly emailService = new EmailService();

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

  verifyIfUserNameAlreadyExists = async (userName: string) => {
    const userNameAlreadyExists = await prisma.user.findFirst({
      where: {
        username: userName,
      },
    });

    return userNameAlreadyExists;
  };

  createNewUser = async (userData: TUserCreated) => {
    const { username, password, email, idBrandMaster } = userData;

    userCreatedSchema.parse(userData);

    const emailAlreadyExists =
      await this.emailService.checkIfAlreadyExists(email);

    const userNameAlreadyExists =
      await this.verifyIfUserNameAlreadyExists(username);

    if (userNameAlreadyExists || emailAlreadyExists) {
      throw new AppError(
        ERROR_MESSAGE.USER_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    if (idBrandMaster) {
      await this.brandMasterService.getById(idBrandMaster);
    }

    const encriptedPassword = await hash(password, 12);

    const createdUser = await this.userModel.create({
      ...userData,
      password: encriptedPassword,
    });

    return createdUser;
  };

  listByLoginEmail = async (loginData: TUserLogin) => {
    const searchedUser = await this.userModel.findByLoginEmail(loginData);

    return searchedUser;
  };

  updateLastLoginDate = async (req: Request) => {
    const userId = req.params.idUser as string;

    await this.listById(userId);

    await this.userModel.updateLastLoginDate(userId);
  };

  updateUserById = async (req: Request) => {
    const userId = req.params.idUser as string;
    const { body } = req;

    userUpdatedSchema.parse(body);

    await this.listById(userId);

    if (body.idBrandMaster) {
      await this.brandMasterService.getById(body.idBrandMaster);
    }

    const updatedUser = await this.userModel.updateById(userId, body);

    return updatedUser;
  };

  deleteUserById = async (req: Request) => {
    const userId = req.params.idUser as string;

    await this.listById(userId);

    const deletedUser = await this.userModel.deleteById(userId);

    return deletedUser;
  };
}
