import bcrypt from 'bcrypt'
import { Entity, OneToMany, EventArgs, Collection, Property, t, BeforeUpdate, BeforeCreate } from '@mikro-orm/sqlite'
import { BaseEntity } from '../common/base.entity.js'
import { Meeting } from '../meeting/meeting.entity.js'

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10

@Entity()
export class User extends BaseEntity<'bio'> {
  @Property()
  firstName!: string

  @Property()
  lastName!: string

  @Property({unique: true, index: true})
  email!: string

  @Property({hidden: true, lazy: true})
  password!: string

  @Property()
  designation!: string

  @Property({type: t.text})
  bio = ''

  @OneToMany({mappedBy: 'createdBy'})
  meetings = new Collection<Meeting>(this)

  @BeforeCreate()
  @BeforeUpdate()
  hashPassword(args: EventArgs<User>) {
    const password = args.changeSet?.payload.password

    if (password) {
      this.password = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    }
  }

  verifyPassword(password: string) {
    return (
      bcrypt.compareSync(password, this.password)
    )
  }
}
