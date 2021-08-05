import {
  BaseEntity,
  Column,
  ManyToOne,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Common } from "./Common";
import User from "./User";

@Entity()
class Comment extends Common {
  @ManyToOne(type => User)
  author: User;

  @Column("text")
  body: string;
}

export default Comment;
