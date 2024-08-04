import { parsePayload } from "paseto-ts/lib/parse";
import { generateKeys, encrypt, decrypt } from "paseto-ts/v4";

const local_key = generateKeys('local')

export const encryptPayload = (contents: string, expiry: string|undefined = '30 days'): string | undefined => {
  try {
    const payload = parsePayload(contents)
    if (expiry){
      payload.exp = expiry
    }
    const token = encrypt (
      local_key,
      payload,
    )
    return token
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message)
    }
  }
}


export const decryptToken = (token: string): string | undefined => {
  try {
    const payload = decrypt(local_key, token)
    const str = JSON.stringify(payload.payload)
    console.log(payload)
    return str
  } catch (e) {
    if (e instanceof Error) {
      console.error('Decryption error:', e.message);
      return undefined; // Return undefined on error
    }
    throw e;
  }
}
