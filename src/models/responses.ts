// Interface for the Users table
export interface UserResponse {
  name: string;       // User Name
  designation: string;// User Designation
  email: string;      // User email
  created_at: Date;   // Creation timestamp
}

export interface UserResponseToken {
  name: string;       // User Name
  designation: string;// User Designation
  email: string;      // User email
  created_at: Date;   // Creation timestamp
  token_expiry: number; // Token expiry timestamp in Unix time
}
