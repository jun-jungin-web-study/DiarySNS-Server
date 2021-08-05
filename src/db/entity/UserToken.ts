import { Entity, Column, ManyToOne } from "typeorm";
import { Common } from "./Common";
import User from "./User";

@Entity()
export class UserToken extends Common {
  @Column({ comment: "Refresh Token" })
  refreshToken: string;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  user: User;
}
