import { Router, Request, Response, NextFunction } from "express";
import baseController from "../baseController";
import AuthService from "../../service/auth/AuthService";
import UserService from "../../service/UserService";
import passport from "passport";

class UserController extends baseController {
  public url = "/api/user";
  public router = Router();
  public service: UserService;
  public authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    super();
    this.service = userService;
    this.authService = authService;
    this.init();
  }

  public init() {
    this.router.post("/", this.service.registerUser, this.authService.addAccessToken);
    this.router.post("/login", this.service.loginUser, this.authService.addAccessToken);
    this.router.get(
      "/",
      passport.authenticate("jwt", { session: false }),
      this.service.getCurrentUser,
      this.authService.addAccessToken
    );
    this.router.delete(
      "/",
      passport.authenticate("jwt", { session: false }),
      this.service.deleteUser
    );
    this.router.put(
      "/",
      passport.authenticate("jwt", { session: false }),
      this.service.updateUser,
      this.authService.addAccessToken
    );
  }
}

export default UserController;
