import z from "zod";
import { Gender, UserRole, UserSchema, UserStatus } from "./model";

export const RegisterUserSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true
})

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true
})

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;

export const CreateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).default(Gender.UNKNOWN),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(UserRole).default(UserRole.CUSTOMER),
  status: z.enum(UserStatus).default(UserStatus.ACTIVE)
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).optional(),
  email: z.string().email().optional(),
  password: z.string().optional()
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;

export const CondUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.enum(Gender).optional(),
});

export type CondUserDTO = z.infer<typeof CondUserSchema>;