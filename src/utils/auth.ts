import { UserResponse, UserResponseToken } from "@/models/responses"
import { encryptMessage } from "./crypto"

const generateExpiryTimeUnix = (): number => {
  const currentTime = new Date();
  const expiryTime = new Date(currentTime.getTime() + 30 * 24 * 60 * 60000);
  return Math.floor(expiryTime.getTime() / 1000); // Convert to Unix time in seconds
};

export const getUserToken = async (user: UserResponse): Promise<string> => {
  const token_resp: UserResponseToken = { ...user, token_expiry: generateExpiryTimeUnix()}
  const token = encryptMessage(token_resp)
  return await token;
}
