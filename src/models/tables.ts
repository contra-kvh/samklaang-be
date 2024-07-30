// Interface for the Users table
export interface UserEntry {
  name: string;       // User Name
  designation: string;// User Designation
  email: string;      // User email
  pwhash: string;     // Password hash
  created_at: Date;   // Creation timestamp
}

// Interface for the Participants table
export interface ParticipantEntry {
  email: string;      // Participant email
  name: string;       // Participant name
  org_name: string;   // Organization name
  designation: string;// Designation
  verified: boolean;  // Verification status
}

// Interface for the Meetings table
export interface MeetingEntry {
  agenda: string;     // Meeting agenda
  start_time: Date;   // Start time of the meeting
  join_code: string;  // Join code for the meeting
  is_recorded?: boolean; // Optional field: recording status
  created_at: Date;   // Creation timestamp
}
