import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser";
import { EmailService } from "./EmailService";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { UserService } from "./UserService";
import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";

export class AuthService {
  constructor() {}
  private readonly emailService = new EmailService();
  private readonly userService = new UserService();

  register = async (userData: TUserCreated) => {
    const { username, password, email } = userData;

    userCreatedSchema.parse(userData);

    const emailAlreadyExists =
      await this.emailService.checkIfAlreadyExists(email);

    const userNameAlreadyExists =
      await this.userService.verifyIfUserNameAlreadyExists(username);

    if (userNameAlreadyExists || emailAlreadyExists) {
      throw new AppError(
        ERROR_MESSAGE.USER_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const encriptedPassword = await hash(password, 12);

    const createdUser = await this.userService.createNewUser({
      ...userData,
      password: encriptedPassword,
    });

    return createdUser;
  };
}
