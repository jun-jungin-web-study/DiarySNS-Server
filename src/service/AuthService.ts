import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import { ENV_CONFIG } from "../config/envconfig";
import User from "../db/entity/User";
import UserRepository from "../db/repository/UserRepository";

const SECRET: string = ENV_CONFIG.SECRET;
const ACCESS_TOKEN_EXPIRE: string = ENV_CONFIG.ACCESS_TOKEN_EXPIRE;
const REFRESH_TOKEN_EXPIRE: string = ENV_CONFIG.REFRESH_TOKEN_EXPIRE;

export const reqUser = (user: User): Express.User => {
  return {
    id: user.id,
    email: user.email
  };
};

export const issueAccessToken = (user: User) => {
  const payload = {
    email: user.id,
    nickname: user.nickname,
    description: user.description,
    profileImage: user.profileImage
  };

  return jwt.sign(payload, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
};

export const issueRefreshToken = (user: User) => {
  const payload = {
    email: user.id,
    nickname: user.nickname,
    description: user.description,
    profileImage: user.profileImage
  };

  return jwt.sign(payload, SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    async (email: string, password: string, done: any) => {
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findByEmail(email);

      //no such user
      if (!user) return done(null, false);

      //check password
      if (await user.comparePassword(password))
        return done(null, reqUser(user));

      //invalid password
      return done(null, false);
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError)
          return done(new Error("LoginError: Token Expired"), false);

        if (err instanceof jwt.JsonWebTokenError)
          return done(new Error("LoginError: Invalid Token"), false);

        return done(err, false);
      }
    });
  })
);
