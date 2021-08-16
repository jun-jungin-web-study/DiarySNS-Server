import { Request } from "express";
import User from "../../../db/entity/User";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserPayloadInterface } from "../AuthService";
import { ENV_CONFIG } from "../../../config/envconfig";
import logger from "../../../middleware/logger";

const secret = ENV_CONFIG.SECRET;

interface tokenPayload extends UserPayloadInterface {
  iat: string;
  exp: string;
}

passport.use(
  new JwtStrategy(
    {
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    },
    async (req: Request, payload: tokenPayload, next: any) => {
      try {
        // TODO: ADD additional token checking logic
        // check expire date and other fields
        // Refresh token
        logger.info(`Try to authenticate - ${payload}`);

        const user = await User.findOne({ email: payload.email });
        return user ? next(null, user) : next(`Authentication Error: User doesn't exist`, false);
      } catch (error) {
        return next(error, false);
      }
    }
  )
);
