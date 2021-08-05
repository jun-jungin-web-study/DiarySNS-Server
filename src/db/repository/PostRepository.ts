import { EntityRepository, AbstractRepository } from "typeorm";
import Post from "../entity/Post";

@EntityRepository(Post)
class PostRepository extends AbstractRepository<Post> {}

export default PostRepository;
