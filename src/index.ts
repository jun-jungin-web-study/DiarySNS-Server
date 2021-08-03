import { createConnection } from "typeorm";
import express from "express";
import logger from "./middleware/logger";

import { SERVER_CONFIG } from "./config/serverconfig";
import { connectionOptions } from "./config/ormconfig";
import { DB } from "./config/dbcconfig";

import App from "./app";

import LoginService from "./service/LoginService";
import AuthService from "./service/AuthService";
import PostService from "./service/PostService";
import CommentService from "./service/CommentService";
import TagService from "./service/TagService";
import UserService from "./service/UserService";

import baseController from "./controller/baseController";
import LoginController from "./controller/Login/LoginController";
import UserController from "./controller/User/UserController";
import PostController from "./controller/Post/PostController";
import CommentController from "./controller/Comment/CommentController";
import TagController from "./controller/Tag/TagController";

const PORT = SERVER_CONFIG.SERVER_PORT;

const serve = async (): Promise<void> => {
  const middlewares: any[] = [
    express.urlencoded({ extended: true }),
    express.json()
  ];

  const authService = new AuthService();
  const loginService = new LoginService();
  const postService = new PostService();
  const commentService = new CommentService();
  const tagService = new TagService();
  const userService = new UserService();

  const controllers: baseController[] = [
    new LoginController(loginService, authService),
    new UserController(userService, authService),
    new PostController(postService, authService),
    new CommentController(commentService, authService),
    new TagController(tagService, authService)
  ];

  const connection = await createConnection(connectionOptions(DB.DEV));
  const app = new App(connection, controllers, middlewares);
  app.app.listen(PORT, () => logger?.info(`Server start on ${PORT}`));
};

serve();
