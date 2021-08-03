import { Router } from "express";
import baseController from "../baseController";
import AuthService from "../../service/AuthService";
import TagService from "../../service/TagService";

class TagController extends baseController {
  public url = "/tag";
  public router = Router();
  public service: TagService;
  public authService: AuthService;

  constructor(tagService: TagService, authService: AuthService) {
    super();
    this.service = tagService;
    this.authService = authService;
  }

  public init() {}
}

export default TagController;
