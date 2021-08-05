import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany
} from "typeorm";
import Image from "./Image";
import Tag from "./Tag";
import User from "./User";

enum BackgroundPaper {
  BASIC = "basic"
}

@Entity()
class Post extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @ManyToOne(type => User)
  author: User;

  @Column({ type: "longtext" })
  body: string;

  @Column({ type: "boolean" })
  isPublic: boolean;

  @Column({ type: "varchar", length: 100 })
  font: string;

  @Column({ type: "enum", enum: BackgroundPaper })
  backgroundPaper: BackgroundPaper;

  @Column({ type: "int" })
  likes: number;

  @ManyToMany(type => Tag)
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Post;
