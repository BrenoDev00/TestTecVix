import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserLogin } from "../types/validations/User/userLogin";

export class UserModel {
  create = async (userData: TUserCreated) => {
    const createdUser = await prisma.user.create({
      data: userData,
    });

    return createdUser;
  };

  findLoginCredentials = async (loginData: TUserLogin) => {
    const isValidCredentials = await prisma.user.findFirst({
      where: {
        email: loginData.email,
      },
      select: {
        email: true,
        password: true,
      },
    });

    return isValidCredentials;
  };
}
