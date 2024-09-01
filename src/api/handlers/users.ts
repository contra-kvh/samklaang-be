import { Request, Response } from "express";
import { findUserByUUID, updateUserByUUID } from "../../database/users.js";

// GET /users/:uuid
export const getUser = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUUID(uuid);
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
  const { uuid } = res.locals.user;
  req.params.uuid = uuid;
  return getUser(req, res);
};

// PATCH /profile
export const updateProfile = async (req: Request, res: Response) => {
  const { uuid } = res.locals.user;
  const updatedData = req.body;
  console.log(`to update:\n${JSON.stringify(updatedData)}`);

  try {
    const user = await updateUserByUUID(uuid, updatedData);
    res.status(200).json({ message: "User updated", user });
  } catch (error: any) {
    console.error(`Error updating profile for user ${uuid}:`, error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};
