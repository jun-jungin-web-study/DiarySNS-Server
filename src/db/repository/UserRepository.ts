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

  async signup(user: User): Promise<User> {
    return this.manager.transaction(async transactionManager => {
      const registeredUser = await transactionManager.save(user);
      return registeredUser;
    });
  }
}

export default UserRepository;
