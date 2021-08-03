import { Router } from "express";
import baseController from "../baseController";
import AuthService from "../../service/AuthService";
import CommentService from "../../service/CommentService";

class CommentController extends baseController {
  public url = "/comment";
  public router = Router();
  public service: CommentService;
  public authService: AuthService;

  constructor(commentService: CommentService, authService: AuthService) {
    super();
    this.service = commentService;
    this.authService = authService;
  }

  public init() {}
}

export default CommentController;
