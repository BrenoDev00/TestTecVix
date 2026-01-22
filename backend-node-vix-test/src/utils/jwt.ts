import { sign } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../constants/jwt-secret";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
interface IPayload {
  email: string;
  password: string;
}

export const genToken = (payload: IPayload) => {
  const accessToken = sign(payload, JWT_SECRET, {
    expiresIn: 86400, // 1 dia
  });

  return accessToken;
};

export const verifyToken = (token: string) => {
  try {
    verify(token, JWT_SECRET);

    return true;
  } catch {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
