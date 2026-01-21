import { sign } from "jsonwebtoken";
// import { AppError } from "../errors/AppError";
import { jwtSecret } from "../constants/jwt-secret";

interface IPayload {
  email: string;
  password: string;
}

export const genToken = (payload: IPayload) => {
  const accessToken = sign(payload, jwtSecret, {
    expiresIn: 86400, // 1 dia
  });

  return accessToken;
};

export const verifyToken = (token: string) => {
  try {
    return; // data;
  } catch (error) {
    // throws new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
