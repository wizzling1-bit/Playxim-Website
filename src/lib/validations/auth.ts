import { z } from "zod";

export const RESERVED_USERNAMES = [
  "admin",
  "api",
  "app",
  "auth",
  "dashboard",
  "download",
  "features",
  "help",
  "privacy",
  "pricing",
  "settings",
  "status",
  "support",
  "watch",
  "www",
  "root",
  "system",
  "billing",
  "static",
  "public",
];

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username cannot exceed 30 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens"
  )
  .refine(
    (val) => !RESERVED_USERNAMES.includes(val.toLowerCase()),
    "This username is reserved and cannot be claimed"
  );

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  username: usernameSchema,
  agreeTerms: z.boolean().refine((val) => val === true, "You must accept the terms of service"),
});

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
