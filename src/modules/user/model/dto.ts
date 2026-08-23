import z from "zod";
import { Gender, UserSchema, UserStatus } from "./user";
import {
  ErrEmailInvalid,
  ErrFirstNameAtLeast2Chars,
  ErrLastNameAtLeast2Chars,
  ErrPasswordAtLeast6Chars
} from "./error";
import { Role } from "../../../shared/interface";

export const RegisterUserSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true
});

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;

export const CreateUserSchema = z.object({
  firstName: z.string().min(2, ErrFirstNameAtLeast2Chars.message),
  lastName: z.string().min(2, ErrLastNameAtLeast2Chars.message),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).default(Gender.UNKNOWN),
  email: z.string().email(ErrEmailInvalid.message),
  password: z.string().min(6, ErrPasswordAtLeast6Chars.message),
  role: z.enum(Role).default(Role.CUSTOMER),
  status: z.enum(UserStatus).default(UserStatus.ACTIVE)
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
  firstName: z.string().min(2, ErrFirstNameAtLeast2Chars.message).optional(),
  lastName: z.string().min(2, ErrLastNameAtLeast2Chars.message).optional(),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).optional(),
  email: z.string().email(ErrEmailInvalid.message).optional(),
  password: z.string().min(6, ErrPasswordAtLeast6Chars.message).optional(),
  status: z.enum(UserStatus).optional()
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;

export const CondUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(ErrEmailInvalid.message).optional(),
  gender: z.enum(Gender).optional(),
});

export type CondUserDTO = z.infer<typeof CondUserSchema>;

export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;

export const UpdateAccountSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.enum(Gender).optional(),
  avatar: z.string().optional(),
  password: z.string().min(6, ErrPasswordAtLeast6Chars.message).optional()
});

export type UpdateAccountDTO = z.infer<typeof UpdateUserSchema>;