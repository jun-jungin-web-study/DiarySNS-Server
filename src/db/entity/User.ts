import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne
} from "typeorm";
import { Common } from "./Common";
import Image from "./Image";

@Entity()
class User extends Common {
  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 15, unique: true })
  nickname: string;

  @Column({ type: "text" })
  description: string;

  @OneToOne(type => Image)
  profileImage: Image;
}

export default User;
