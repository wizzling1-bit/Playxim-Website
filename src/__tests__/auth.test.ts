import { describe, it, expect } from "vitest";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";

describe("Auth Validation & Security Rules", () => {
  it("rejects system reserved usernames like admin, api, dashboard", () => {
    const reservedAttempt = signUpSchema.safeParse({
      username: "admin",
      email: "test@example.com",
      password: "StrongPassword123!",
    });
    expect(reservedAttempt.success).toBe(false);

    const apiAttempt = signUpSchema.safeParse({
      username: "api",
      email: "test@example.com",
      password: "StrongPassword123!",
    });
    expect(apiAttempt.success).toBe(false);
  });

  it("accepts valid creator username and validates password complexity", () => {
    const valid = signUpSchema.safeParse({
      username: "creative_filmmaker",
      email: "filmmaker@playxim.com",
      password: "StrongPassword123!",
      agreeTerms: true,
    });
    expect(valid.success).toBe(true);

    const weakPassword = signUpSchema.safeParse({
      username: "creative_filmmaker",
      email: "filmmaker@playxim.com",
      password: "weak",
      agreeTerms: true,
    });
    expect(weakPassword.success).toBe(false);
  });

  it("validates sign-in email structure", () => {
    const valid = signInSchema.safeParse({
      email: "creator@playxim.com",
      password: "Password123!",
    });
    expect(valid.success).toBe(true);

    const invalid = signInSchema.safeParse({
      email: "not-an-email",
      password: "Password123!",
    });
    expect(invalid.success).toBe(false);
  });
});
