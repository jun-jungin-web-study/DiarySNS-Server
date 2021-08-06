import User from "../../../db/entity/User";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";
import UserRepository from "../../../db/repository/UserRepository";
import { getCustomRepository } from "typeorm";

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
      session: false
    },
    async (req: Request, email: string, password: string, next: any) => {
      console.log("try register");
      try {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);

        console.log(user);
        console.log(email, password);

        if (user) {
          return next("Register Error: User Exists", false);
        }

        const newUser = new User();
        newUser.email = email;
        newUser.nickname = req.body.nickname;
        newUser.password = password;

        console.log(newUser);

        const savedUser: User = await userRepository.signup(newUser);

        return next(null, savedUser);
      } catch (error) {
        console.log(error);
        return next(error.code, false);
      }
    }
  )
);
