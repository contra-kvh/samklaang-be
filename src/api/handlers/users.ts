import { Request, Response } from "express";
import { User } from "../../database/entities/user/user.entity.js";
import { EntityManager } from "@mikro-orm/sqlite";

let em: EntityManager;

export const setEntityManager = (_em: EntityManager) => {
  em = _em;
};

const findUserByUuid = async (uuid: string): Promise<User | null> => {
  return await em.findOne(User, { uuid });
};

// GET /users
export const getUser = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUuid(uuid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    console.error(`Error fetching user ${req.params.uuid}:`, error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

// GET /profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { uuid } = res.locals.user;
    const user = await findUserByUuid(uuid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    console.error(
      `Error fetching profile for user ${res.locals.user.uuid}:`,
      error
    );
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

// PATCH /profile
export const updateProfile = async (req: Request, res: Response) => {
  const { uuid } = res.locals.user;
  const updatedData = req.body;

  if (Object.keys(updatedData).length === 0) {
    return res.status(400).json({ message: "No data provided for update" });
  }

  try {
    const user = await findUserByUuid(uuid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    em.assign(user, updatedData);
    await em.persistAndFlush(user);

    res.status(200).json({ message: "User updated", user });
  } catch (error: any) {
    console.error(`Error updating profile for user ${uuid}:`, error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};
