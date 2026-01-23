import { prisma } from "../database/client";
import { TQuery } from "../types/validations/Queries/queryListAll";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserLogin } from "../types/validations/User/userLogin";

export class UserModel {
  totalCount = async (query: TQuery, isIncludeDeleted?: boolean) => {
    return prisma.user.count({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        username: {
          contains: query.search,
        },
      },
    });
  };

  findAll = async (query: TQuery, isIncludeDeleted?: boolean) => {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const users = await prisma.user.findMany({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        username: {
          contains: query.search,
        },
      },
      select: {
        idUser: true,
        idBrandMaster: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        profileImgUrl: true,
        username: true,
        email: true,
        lastLoginDate: true,
        role: true,
        isActive: true,
        brandMaster: {
          select: {
            brandName: true,
          },
        },
      },
      take: limit || undefined,
      skip,
      ...(orderBy.length ? { orderBy } : { orderBy: [{ updatedAt: "desc" }] }),
    });

    const totalCount = await this.totalCount(query, isIncludeDeleted);
    return { totalCount, result: users };
  };

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

  findByLoginEmail = async (loginData: TUserLogin) => {
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

  updateLastLoginDate = async (userId: string) => {
    await prisma.user.update({
      where: {
        idUser: userId,
      },
      data: {
        lastLoginDate: new Date(),
      },
    });
  };
}
