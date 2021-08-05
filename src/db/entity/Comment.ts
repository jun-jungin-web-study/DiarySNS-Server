import {
  BaseEntity,
  Column,
  ManyToOne,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity()
class Comment extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @ManyToOne(type => User)
  author: User;

  @Column("text")
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Comment;
