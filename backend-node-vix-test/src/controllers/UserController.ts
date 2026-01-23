import { Request, Response } from "express";
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

  getUserToken = async (req: Request, res: Response) => {
    const accessToken = await this.userService.getNewUserToken(req);

    return res.status(STATUS_CODE.OK).json({ token: accessToken });
  };

  putLastLoginDate = async (req: Request, res: Response) => {
    await this.userService.updateLastLoginDate(req);

    return res.status(STATUS_CODE.NO_CONTENT).send();
  };

  deleteUser = async (req: Request, res: Response) => {
    const deletedUser = await this.userService.deleteUserById(req);

    return res.status(STATUS_CODE.OK).send(deletedUser);
  };
}
