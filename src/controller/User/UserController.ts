import { Router } from "express";
import baseController from "../baseController";
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";

class UserController extends baseController {
  public url = "/user";
  public router = Router();
  public service: UserService;
  public authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    super();
    this.service = userService;
    this.authService = authService;
  }

  public init() {}
}

export default UserController;
