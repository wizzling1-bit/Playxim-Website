import { describe, it, expect } from "vitest";
import { shareService } from "@/lib/services/share.service";

describe("Share Link Management Tests", () => {
  it("generates 8-character base64url share codes", () => {
    const code = shareService.generateCode();
    expect(code).toBeDefined();
    expect(code.length).toBe(8);
    expect(code).toMatch(/^[a-zA-Z0-9_-]{8}$/);
  });

  it("hashes passcodes with deterministic SHA-256 and verifies matches", () => {
    const rawPass = "SecretVault2026!";
    const hash = shareService.hashPassword(rawPass);

    expect(hash).toHaveLength(64); // SHA-256 hex string length
    expect(shareService.hashPassword(rawPass)).toBe(hash);
    expect(shareService.hashPassword("WrongPassword")).not.toBe(hash);
  });
});
