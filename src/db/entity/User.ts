import { Column, Entity, OneToOne, BeforeInsert, OneToMany } from "typeorm";
import { Common } from "./Common";
import Image from "./Image";
import bcrypt from "bcrypt";
import { UserToken } from "./UserToken";

const saltRounds = 5;

@Entity()
class User extends Common {
  @Column({ unique: true, type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 15, unique: true })
  nickname: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @OneToOne(type => Image, { nullable: true })
  profileImage: Image;

  @OneToMany(type => UserToken, (userToken: UserToken) => userToken.user, {
    cascade: true
  })
  userTokens: UserToken[];

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
