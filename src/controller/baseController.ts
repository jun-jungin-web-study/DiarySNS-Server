import { Router } from "express";
import AuthService from "../service/AuthService";

abstract class baseController {
  // url for routing
  url!: string;

  // express router
  abstract router: Router;
  abstract service: any;
  authService?: AuthService;

  //register functions requests at router
  abstract init(): void;
}

export default baseController;
