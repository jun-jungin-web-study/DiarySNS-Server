import { EntityRepository, AbstractRepository } from "typeorm";
import Tag from "../entity/Tag";

@EntityRepository(Tag)
class TagRepository extends AbstractRepository<Tag> {}

export default TagRepository;
