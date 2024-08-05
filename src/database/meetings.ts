import { EntityManager } from "@mikro-orm/sqlite";
import { MeetingCode } from "./entities/meeting/meetingCode.entity.js";

var em: EntityManager

export const meetingSetEM = (_em: EntityManager) => {
  em = _em
}

export const checkJoinCodeAvailable = async (code: string): Promise<boolean> => {
  const entity = await em.findOne(MeetingCode, {code: code})
  return entity === undefined
}
