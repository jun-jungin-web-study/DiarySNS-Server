import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ENV_CONFIG } from "../../config/envconfig";
import User from "../../db/entity/User";
import logger from "middleware/logger";

export interface UserPayloadInterface {
  email: string;
  nickname: string;
  description: string | null;
  profileImage: string | null;
}

class AuthService {
  private SECRET: string = ENV_CONFIG.SECRET;
  private ACCESS_TOKEN_EXPIRE: string = ENV_CONFIG.ACCESS_TOKEN_EXPIRE;
  private REFRESH_TOKEN_EXPIRE: string = ENV_CONFIG.REFRESH_TOKEN_EXPIRE;

  private issueToken = async (payload: UserPayloadInterface, expiresIn: string) => {
    return jwt.sign(payload, this.SECRET, {
      expiresIn
    });
  };

  public issueAccessToken = (payload: UserPayloadInterface) =>
    this.issueToken(payload, this.ACCESS_TOKEN_EXPIRE);

  public issueRefreshToken = (payload: UserPayloadInterface) =>
    this.issueToken(payload, this.REFRESH_TOKEN_EXPIRE);

  public addAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    logger.info(`Issue Access token - ${user}`);

    const payload: UserPayloadInterface = {
      email: user.email,
      nickname: user.nickname,
      description: user.description ?? null,
      profileImage: user.profileImage?.name ?? null
    };

    const token = await this.issueAccessToken(payload);

    return res.status(200).json({ user: { ...payload, token } });
  };
}

export default AuthService;
