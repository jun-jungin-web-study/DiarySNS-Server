import { EntityRepository, AbstractRepository, Not } from "typeorm";
import User from "../entity/User";
import { isNil } from "lodash";

@EntityRepository(User)
class UserRepository extends AbstractRepository<User> {
  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  public findById(id: number): Promise<User | undefined> {
    return this.repository.findOne({ id });
  }

  async isDuplicate(user: { id?: number; username?: string }) {
    if (isNil(user.username)) return null;

    const where =
      user.id !== undefined
        ? { username: user.username, id: Not(user.id) }
        : { username: user.username };

    return (await this.repository.count({ where })) > 0;
  }

  async register(email: string, nickname: string, password: string): Promise<User> {
    return this.manager.transaction(async transactionManager => {
      const newUser = new User();
      newUser.email = email;
      newUser.nickname = nickname;
      newUser.password = password;

      const registeredUser = await transactionManager.save(newUser);
      return registeredUser;
    });
  }

  async updateUser(user: User, nickname?: string, password?: string, description?: string) {
    return this.manager.transaction(async transactionManager => {
      user.nickname = nickname ?? user.nickname;
      user.password = password ?? user.password;
      user.description = description ?? user.description;

      return await transactionManager.save(user);
    });
  }

  async deleteUser(user: User) {
    return this.manager.remove(user);
  }
}

export default UserRepository;
