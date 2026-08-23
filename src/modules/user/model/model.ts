import z from "zod";
import { Role } from "../../../shared/interface";
import {
  ErrEmailInvalid,
  ErrFirstNameAtLeast2Chars,
  ErrLastNameAtLeast2Chars,
  ErrPasswordAtLeast6Chars
} from "./error";

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
  firstName: z.string().min(2, ErrFirstNameAtLeast2Chars.message),
  lastName: z.string().min(2, ErrLastNameAtLeast2Chars.message),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).default(Gender.UNKNOWN),
  email: z.string().email(ErrEmailInvalid.message),
  password: z.string().min(6, ErrPasswordAtLeast6Chars.message),
  salt: z.string(),
  role: z.enum(Role).default(Role.CUSTOMER),
  status: z.enum(UserStatus).default(UserStatus.ACTIVE),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type User = z.infer<typeof UserSchema>;