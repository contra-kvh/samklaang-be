import {Request, Response} from 'express'
import { LoginRequest, RegisterRequest } from "../models/requests.js"
import { authenticateUser, EmailAlreadyInUseError, registerUser } from '../../database/users.js'

export const login = async (req: Request, res: Response) => {
  const body: LoginRequest = req.body
  try {
    const token = await authenticateUser(body.email, body.password)
    res.status(200).json({token: token})
  } catch (e) {
    if (e instanceof Error){
      res.status(401).send(e.message)
    }
  }
}

export const register = async (req: Request, res: Response) => {
  const body: RegisterRequest = req.body
  // console.log(body)
  try {
    const token = await registerUser(body.firstName, body.lastName, body.designation, body.email, body.password)
    res.status(201).json({token: token})
  } catch (e) {
    if (e instanceof EmailAlreadyInUseError)
      res.status(409).send(e.message)
    else if (e instanceof Error)
      res.status(500).send(e.message)
  }
}
