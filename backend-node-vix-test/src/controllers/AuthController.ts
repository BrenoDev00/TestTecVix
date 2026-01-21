import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { STATUS_CODE } from "../constants/statusCode";

export class AuthController {
  constructor() {}
  private readonly authService = new AuthService();

  postRegister = async (req: Request, res: Response) => {
    const createdUser = await this.authService.register(req.body);

    return res.status(STATUS_CODE.CREATED).send(createdUser);
  };
}
