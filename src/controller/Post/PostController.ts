import { Router } from "express";
import baseController from "../baseController";
import AuthService from "../../service/AuthService";
import PostService from "../../service/PostService";

class PostController extends baseController {
  public url = "/post";
  public router = Router();
  public service: PostService;
  public authService: AuthService;

  constructor(postService: PostService, authService: AuthService) {
    super();
    this.service = postService;
    this.authService = authService;
    this.init();
  }

  public init() {}
}

export default PostController;
