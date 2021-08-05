import { EntityRepository, AbstractRepository } from "typeorm";
import Image from "../entity/Image";

@EntityRepository(Image)
class ImageRepository extends AbstractRepository<Image> {}

export default ImageRepository;
