import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";

export class UserModel {
  create = async (userData: TUserCreated) => {
    const createdUser = await prisma.user.create({
      data: userData,
    });

    return createdUser;
  };
}
