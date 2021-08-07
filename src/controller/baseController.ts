import { Router } from "express";
import AuthService from "../service/auth/AuthService";

abstract class baseController {
  // url for routing
  url!: string;

  // express router
  abstract router: Router;

  // services
  abstract service: any;

  //always have authservice
  authService?: AuthService;

  //register get, post, put, etc at router
  abstract init(): void;
}

export default baseController;
