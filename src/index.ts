import { ENV_CONFIG } from "./config/envconfig";

import App from "./app";

import logger from "./middleware/logger";

import baseController from "./controller/baseController";
import UserController from "./controller/User/UserController";
import PostController from "./controller/Post/PostController";
import CommentController from "./controller/Comment/CommentController";
import TagController from "./controller/Tag/TagController";

import AuthService from "./service/auth/AuthService";
import PostService from "./service/PostService";
import CommentService from "./service/CommentService";
import TagService from "./service/TagService";
import UserService from "./service/UserService";

import dbConnection from "./db/db";
import UserRepository from "./db/repository/UserRepository";

import passport from "passport";
import { Connection } from "typeorm";
import express from "express";
import cors from "cors";

export const bootstrap = async (connection: Connection) => {
  const middlewares: any[] = [
    express.urlencoded({ extended: true }),
    express.json(),
    passport.initialize(),
    cors()
  ];

  const authService = new AuthService();
  const postService = new PostService();
  const commentService = new CommentService();
  const tagService = new TagService();
  const userService = new UserService(connection.getCustomRepository(UserRepository));

  const controllers: baseController[] = [
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
      return bootstrap(connection);
    })
    .then(app => {
      app.listen(ENV_CONFIG.PORT);
    });
}
