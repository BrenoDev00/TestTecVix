import { Response } from "express";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";
import { CustomRequest } from "../types/custom";

export class UserController {
  constructor() {}
  private readonly userService = new UserService();

  getUsers = async (req: CustomRequest<unknown>, res: Response) => {
    const result = await this.userService.listAll(req.query);

    return res.status(STATUS_CODE.OK).json(result);
  };
}
