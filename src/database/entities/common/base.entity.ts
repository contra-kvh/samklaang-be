import { OptionalProps, PrimaryKey, Property } from "@mikro-orm/sqlite";
import { v4 as uuid4 } from 'uuid'

export abstract class BaseEntity<Optional = never> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional

  @PrimaryKey()
  uuid = uuid4()

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
