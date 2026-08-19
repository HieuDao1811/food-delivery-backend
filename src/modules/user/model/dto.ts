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

export const UserUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().url().optional(),
  gender: z.enum(Gender).optional(),
  email: z.string().email().optional(),
  password: z.string().optional()
});

export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;

export const UserCondSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.enum(Gender).optional(),
});

export type UserCondDTO = z.infer<typeof UserCondSchema>;