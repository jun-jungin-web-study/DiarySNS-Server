import { BaseEntity, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
class Image extends BaseEntity {
  @PrimaryColumn("uuid")
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Image;
