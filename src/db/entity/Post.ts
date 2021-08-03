import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

type BackgroundPaper = "normal";

@Entity()
class Post extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "longtext" })
  body: string;

  @Column({ type: "boolean" })
  isPublic: boolean;

  @Column()
  font: string;

  @Column()
  backgroundPaper: BackgroundPaper;
  //   author

  //   tags: string[];
}

export default Post;
