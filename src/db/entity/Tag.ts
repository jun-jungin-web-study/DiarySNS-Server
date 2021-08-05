import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column
} from "typeorm";

@Entity()
class Tag extends BaseEntity {
  @PrimaryColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Tag;
