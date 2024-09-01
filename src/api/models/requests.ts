import { z } from 'zod';

// Login Request Schema
export const LoginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password with minimum length 8 is required"),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Registration Request Schema
export const RegisterRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is requred"),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

// User Registration Request Schema
export const PatchUserRequestSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  designation: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
});
export type PatchUserRequestSchema = z.infer<typeof PatchUserRequestSchema>;

// Participant Registration Request Schema
export const RegisterParticipantRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
  org_name: z.string().min(1, "Organization name is required"),
  designation: z.string().min(1, "Designation is required"),
});
export type RegisterParticipantRequest = z.infer<typeof RegisterParticipantRequestSchema>;

// Account Holder Meeting Joining Request Schema
export const UserMeetingJoinRequestSchema = z.object({
  join_code: z.string().min(1, "Join code is required"),
});
export type UserMeetingJoinRequest = z.infer<typeof UserMeetingJoinRequestSchema>;

// Guest Meeting Joining Request Schema
export const GuestMeetingJoinRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  org_name: z.string().min(1, "Organization name is required"),
  designation: z.string().min(1, "Designation is required"),
  join_code: z.string().min(1, "Join code is required"),
});
export type GuestMeetingJoinRequest = z.infer<typeof GuestMeetingJoinRequestSchema>;

// Create Meeting Request Schema
export const NewMeetingRequestSchema = z.object({
  agenda: z.string().min(1, "Agenda is required"),
  start_time: z.date(),
  is_recorded: z.boolean().optional().default(false),
  is_verified_only: z.boolean().optional().default(false),
  password: z.string().optional(),
});
export type NewMeetingRequest = z.infer<typeof NewMeetingRequestSchema>;

// Create Mailing List Request Schema
export const NewMailingListRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  members: z.array(z.string().email("Invalid email address")),
});
export type NewMailingListRequest = z.infer<typeof NewMailingListRequestSchema>;

// Add Email to Mailing List Request Schema
export const AddMailingListMemberRequestSchema = z.object({
  uuid: z.string().uuid("Invalid UUID"),
  members: z.array(z.string().email("Invalid email address")),
});
export type AddMailingListMemberRequest = z.infer<typeof AddMailingListMemberRequestSchema>;
