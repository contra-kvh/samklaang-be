import { EntityManager, MikroORM } from "@mikro-orm/sqlite"

const orm = await MikroORM.init()
await orm.schema.refreshDatabase()

export const getEMFork = (): EntityManager => {
  return orm.em.fork()
}
