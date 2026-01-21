import { prisma } from "../database/client";
import { UserModel } from "../models/UserModel";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserLogin } from "../types/validations/User/userLogin";

export class UserService {
  private readonly userModel = new UserModel();

  verifyIfUserNameAlreadyExists = async (userName: string) => {
    const userNameAlreadyExists = await prisma.user.findFirst({
      where: {
        username: userName,
      },
    });

    return userNameAlreadyExists;
  };

  createNewUser = async (userData: TUserCreated) => {
    const createdUser = await this.userModel.create(userData);

    return createdUser;
  };

  getLoginCredentials = async (loginData: TUserLogin) => {
    const searchedUser = await this.userModel.findLoginCredentials(loginData);

    return searchedUser;
  };
}
