import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column
} from "typeorm";
import { Common } from "./Common";

@Entity()
class Tag extends Common {
  @PrimaryColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 255 })
  description: string;
}

export default Tag;
