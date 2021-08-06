import { Request } from "express";
import User from "../../../db/entity/User";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserPayloadInterface } from "../AuthService";
import { ENV_CONFIG } from "../../../config/envconfig";

const secret = ENV_CONFIG.SECRET ?? "secret";

interface tokenPayload extends UserPayloadInterface {
  iat: string;
  exp: string;
}

passport.use(
  new JwtStrategy(
    {
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더의 Bearer 뒷 부분에서 토큰을 추출합니다.
      passReqToCallback: true
    },
    async (req: Request, payload: tokenPayload, next: any) => {
      try {
        const user = await User.findOne({ email: payload.email }); // 토큰의 payload의 _id정보를 통해 유저의 존재 유무를 파악합니다.
        return user ? next(null, user) : next("user not found", false);
      } catch (error) {
        return next(error, false);
      }
    }
  )
);
