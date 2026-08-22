import z from "zod";
import { Role } from "../../../shared/interface";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted'
}

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).default(Gender.UNKNOWN),
  email: z.string().email(),
  password: z.string(),
  salt: z.string(),
  role: z.enum(Role).default(Role.CUSTOMER),
  status: z.enum(UserStatus).default(UserStatus.ACTIVE),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type User = z.infer<typeof UserSchema>;