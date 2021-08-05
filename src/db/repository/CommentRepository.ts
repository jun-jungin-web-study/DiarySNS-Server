import { EntityRepository, AbstractRepository } from "typeorm";
import Comment from "../entity/Comment";

@EntityRepository(Comment)
class CommentRepository extends AbstractRepository<Comment> {}

export default CommentRepository;
