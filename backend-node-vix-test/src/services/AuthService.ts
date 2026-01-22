import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser";
import { EmailService } from "./EmailService";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { UserService } from "./UserService";
import bcrypt, { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import {
  TUserLogin,
  userLoginSchema,
} from "../types/validations/User/userLogin";
import { genToken } from "../utils/jwt";

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

  login = async (loginData: TUserLogin) => {
    const { password } = loginData;

    userLoginSchema.parse(loginData);

    const searchedUser = await this.userService.listByLoginEmail(loginData);

    if (!searchedUser) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const samePasswords = await bcrypt.compare(password, searchedUser.password);

    if (!samePasswords) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const { idUser } = searchedUser;

    const accessToken = genToken({ idUser });

    return { token: accessToken, user: searchedUser };
  };
}
