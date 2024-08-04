import { Entity, Property} from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";

@Entity()
export class MeetingCode extends BaseEntity {
  @Property({index: true, unique: true})
  code!: string

  constructor(code: string) {
    super()
    this.code = code
  }
}
