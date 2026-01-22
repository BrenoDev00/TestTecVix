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

  findById = async (userId: string) => {
    const searchedUser = await prisma.user.findFirst({
      where: {
        idUser: userId,
      },
    });

    return searchedUser;
  };

  findLoginCredentials = async (loginData: TUserLogin) => {
    const searchedUser = await prisma.user.findFirst({
      where: {
        email: loginData.email,
      },
      select: {
        createdAt: true,
        deletedAt: true,
        email: true,
        idBrandMaster: true,
        idUser: true,
        isActive: true,
        profileImgUrl: true,
        role: true,
        updatedAt: true,
        username: true,
        password: true,
      },
    });

    return searchedUser;
  };
}
