import { EntityRepository, AbstractRepository, UpdateResult } from "typeorm";
import User from "../entity/User";
import { UserToken } from "../entity/UserToken";
import { issueRefreshToken } from "../../service/AuthService";

@EntityRepository(UserToken)
class UserTokenRepository extends AbstractRepository<UserToken> {
  creatAndSave(user: User): Promise<UserToken> {
    const refreshToken = issueRefreshToken(user);

    const userToken = new UserToken();
    userToken.user = user;
    userToken.refreshToken = refreshToken;

    return userToken.save();
  }

  async updateRefreshToken(
    userToken: UserToken,
    newRefreshToken: string
  ): Promise<UpdateResult> {
    //FIXME: is this good code?
    return this.repository.update(
      { id: userToken.id },
      { refreshToken: newRefreshToken }
    );
  }
}

export default UserTokenRepository;
