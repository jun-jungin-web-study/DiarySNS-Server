import UserRepository from "../db/repository/UserRepository";
import { NextFunction, Request, Response } from "express";
import User from "../db/entity/User";

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserRegisterRequest {
  email: string;
  nickname: string;
  password: string;
}

interface UserUpdateRequest {
  nickname?: string;
  password?: string;
  description?: string;
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, nickname, password }: UserRegisterRequest = req.body.user;

      const user = await this.userRepository.findByEmail(email);

      if (user) {
        next(`User Register Error: Email ${email} already exists`);
      }

      req.user = await this.userRepository.register(email, nickname, password);

      next();
    } catch (e) {
      next(`User Register Error: ${e}`);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.user as User;
      const { nickname, password, description }: UserUpdateRequest = req.body.user;

      req.user = await this.userRepository.updateUser(user, nickname, password, description);

      next();
    } catch (e) {
      next(`User Update Error: ${e}`);
    }
  };

  public loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: UserLoginRequest = req.body.user;

      const user = await this.userRepository.findByEmail(email);

      if (user === undefined) {
        next(`User Login Error: no such user ${email}`);
      }

      if (!user?.comparePassword(password)) {
        next(`User Login Error: Incorrect password`);
      }

      req.user = user;
      next();
    } catch (e) {
      next(`User Login Error: ${e}`);
    }
  };

  public getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    next();
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, nickname, description, profileImage } = await this.userRepository.deleteUser(
      req.user as User
    );

    res
      .json({
        user: {
          email,
          nickname,
          description: description ?? null,
          profileImage: profileImage ?? null,
          token: null
        }
      })
      .status(200);
  };
}

export default UserService;
