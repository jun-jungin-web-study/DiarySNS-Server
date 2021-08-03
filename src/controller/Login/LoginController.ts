import { Router } from "express";
import baseController from "../baseController";
import LoginService from "../../service/LoginService";
import AuthService from "../../service/AuthService";

class LoginController extends baseController {
  public url = "/login";
  public router = Router();
  public service: LoginService;
  public authService: AuthService;

  constructor(loginService: LoginService, authService: AuthService) {
    super();
    this.service = loginService;
    this.authService = authService;
    this.init();
  }

  public init() {}
}

export default LoginController;
