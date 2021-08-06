import User from "../../../db/entity/User";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";

passport.use(
  "local-login", // 이름
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
      session: false
    },
    async (req: Request, email: string, password: string, next: any) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          const { password } = req.body;
          const isValidPassword = await user.comparePassword(password);

          return isValidPassword
            ? next(null, user)
            : next("wrong password", false);
        }

        return next("wrong email", false);
      } catch (error) {
        return next(error, false);
      }
    }
  )
);
