import { EntityRepository, AbstractRepository } from "typeorm";
import User from "../entity/User";

@EntityRepository(User)
class UserRepository extends AbstractRepository<User> {}

export default UserRepository;
