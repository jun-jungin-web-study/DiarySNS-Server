import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne
} from "typeorm";
import Image from "./Image";

@Entity()
class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;
}

export default User;
