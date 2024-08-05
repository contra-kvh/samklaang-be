import { MikroORM } from '@mikro-orm/sqlite';
import { userSetEM } from './users.js';
import { meetingSetEM } from './meetings.js';

var orm: MikroORM|undefined = undefined

export const bootstrapDB = async () => {
  orm = await MikroORM.init()
  if(!orm.schema.ensureDatabase())
    orm.schema.refreshDatabase()
  userSetEM(orm.em.fork())
  meetingSetEM(orm.em.fork())
}
