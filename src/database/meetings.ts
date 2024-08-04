import { MeetingCode } from "./entities/meeting/meetingCode.entity.js";
import { getEMFork } from "./index.js";

const em = getEMFork()

export const checkJoinCodeAvailable = async (code: string): Promise<boolean> => {
  const entity = await em.findOne(MeetingCode, {code: code})
  return entity === undefined
}
