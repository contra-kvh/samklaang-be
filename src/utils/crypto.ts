import Paseto from 'paseto.js';
import { logger } from './logger';

const encoder = new Paseto.V2()
const sk = (async () => {
  if (process.env.NODE_ENV === 'production') {
    const sk = encoder.symmetric()
    return sk
  } else {
    logger.info("non-production env. injecting key.")
    const raw = Buffer.from([144,94,31,208,191,44,225,131,217,24,222,32,50,2,252,48,190,239,40,245,126,74,76,189,250,8,41,125,69,105,75,162])
    const sk = new Paseto.SymmetricKey(encoder)
    sk.inject(raw)
    return sk
  }
})()

export const encryptMessage = async (payload: Object): Promise<string> => {
  const token = encoder.encrypt(JSON.stringify(payload), await sk)
  logger.info(`generated token: ${await token}`);
  return token;
}

export const decryptMessage = async (token: string): Promise<Object> => {
  logger.info(`decrypted token: ${token}`);
  try {
    const message = await encoder.decrypt(token, await sk)
    logger.info(`${message}`);
    return JSON.parse(message)
  } catch (err) {
    if (err instanceof Error){
      logger.error(`decrypt failed: ${err.message}`)
      throw new Error(err.message);
    }
  }

  return {}
}
