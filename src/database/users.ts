import { v4 as uuid4 } from 'uuid';
import db from '.'
import bcrypt from 'bcrypt';
import { LoginRequest } from '@/models/requests';
import { UserResponse } from '@/models/responses';

export const addUser = (email: string, name: string, designation: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Users (uuid, name, designation, email, pwhash, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      [uuid4(), name, designation, email, password, new Date().toISOString()],
      (err: Error | null) => {
        if (err) {
          console.error("Error inserting user:", err.message);
          reject(new Error(err.message));
        } else {
          console.log("User inserted successfully.");
          resolve();
        }
      }
    );
  });
};

export const getUser = (uuid: string): Promise<UserResponse> => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT name, designation, email, created_at FROM Users WHERE uuid = ?`, [uuid], (err: Error | null, row: UserResponse) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        reject(new Error(err.message));
      } else {
        resolve(row);
      }
    });
  });
};

export const verifyPassword = async (req: LoginRequest): Promise<UserResponse | null> => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT uuid, name, designation, email, pwhash, created_at FROM Users WHERE email = ?`, [req.email], (err: Error | null, row: any) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        reject(new Error(err.message));
      } else if (row) {
        bcrypt.compare(req.password, row.pwhash, (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            // Return user details excluding password hash
            const { pwhash, ...userResponse } = row;
            resolve(userResponse as UserResponse);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
  });
};
