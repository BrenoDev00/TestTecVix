import { prisma } from "../database/client";
import { UserModel } from "../models/UserModel";
import { TUserCreated } from "../types/validations/User/createUser";

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
}
