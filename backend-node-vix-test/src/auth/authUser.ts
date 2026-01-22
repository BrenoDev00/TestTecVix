import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";

export const authUser = async (
  req: CustomRequest<user>,
  _: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];

  const isValidUser = verifyToken(token);

  if (!isValidUser) {
    throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }

  return next();
};
