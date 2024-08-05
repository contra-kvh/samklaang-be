import { NotFoundError, UniqueConstraintViolationException } from "@mikro-orm/core";
import { User } from "./entities/user/user.entity.js";
import { decryptToken, encryptPayload } from "../util/crypto.js";
import { EntityManager } from "@mikro-orm/sqlite";

var em: EntityManager

export const userSetEM = (_em: EntityManager) => {
  em = _em
}

export class EmailAlreadyInUseError extends Error {
  constructor(message: string = 'Email already in use') {
    super(message);
    this.name = 'EmailAlreadyInUseError';
  }
}

export const registerUser = async (firstName: string, lastName: string, designation: string, email: string, password: string): Promise<string|undefined> => {
  const user = em.create(User, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    designation: designation,
    password: password
  })
  em.persist(user)

  try {
    await em.flush()
    em.clear()
    const token = encryptPayload(JSON.stringify(user))
    if (token)
      return token
  } catch (e) {
    if (e instanceof UniqueConstraintViolationException) {
      throw new EmailAlreadyInUseError()
    } else if (e instanceof Error){
      console.error(`error during registration: ${e.message}`)
      throw new Error(e.message)
    }
  }
}

export const authenticateUser = async (email: string, password: string): Promise<string|undefined> => {
  console.log(`login attempt for email: ${email} with password \`${password}\`.`)
  try{
    const user = await em.findOneOrFail(User, {email: email}, {populate: ['password']})
    console.log(user)
    if (user.verifyPassword(password)) {
      const token = encryptPayload(JSON.stringify(user as {uuid: string, firstName: string}))
      if (token)
        return token
    } else {
      throw new Error('email and password do not match')
    }
  } catch (e) {
    if (e instanceof NotFoundError){
      console.error(`\n${email} not in db`)
      throw new Error('email and password do not match')
    } else if (e instanceof Error){
      console.error(`error in authenticateUser: ${e.message}`)
      throw e
    }
  }
}

export const getUserFromToken = async (token: string): Promise<User|undefined> => {
  const user: User = JSON.parse(decryptToken(token)!)
  return user
}
