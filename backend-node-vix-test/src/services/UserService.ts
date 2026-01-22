import { prisma } from "../database/client";
import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserLogin } from "../types/validations/User/userLogin";

export class UserService {
  private readonly userModel = new UserModel();

  listAll = async (query: unknown) => {
    const validQuery = querySchema.parse(query);

    return this.userModel.findAll(validQuery);
  };

  listById = async (userId: string) => {
    const searchedUser = await this.userModel.findById(userId);

    return searchedUser;
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
