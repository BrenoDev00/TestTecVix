import { prisma } from "../database/client";

export class EmailService {
  checkIfAlreadyExists = async (emailAddress: string) => {
    const emailAlreadyExists = await prisma.user.findFirst({
      where: {
        email: emailAddress,
      },
    });

    return emailAlreadyExists;
  };
}
