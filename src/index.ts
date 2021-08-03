import express from "express";
import logger from "./middleware/logger";

import { ENV_CONFIG } from "./config/envconfig";

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
import dbConnection from "./db/db";

export const bootstrap = async () => {
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

  return new App(controllers, middlewares);
};

if (process.env.NODE_ENV !== "test") {
  dbConnection
    .then(connection => {
      logger.info(
        `DB: ${ENV_CONFIG.MAINDB_NAME} connected on ${ENV_CONFIG.DB_HOST}:${ENV_CONFIG.DB_PORT}`
      );
      return bootstrap();
    })
    .then(app => {
      app.listen(ENV_CONFIG.PORT);
    });
}
