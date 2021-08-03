import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn
} from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  createdAt!: Date;
}

export default User;
