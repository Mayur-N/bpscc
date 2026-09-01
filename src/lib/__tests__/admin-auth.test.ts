import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionToken,
  isAdminLoginConfigured,
  isValidSessionToken,
  safeCompare,
} from "@/lib/admin-auth";

describe("admin-auth", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("safeCompare", () => {
    it("returns true for equal strings", () => {
      expect(safeCompare("secret", "secret")).toBe(true);
    });

    it("returns false for different strings", () => {
      expect(safeCompare("secret", "wrong")).toBe(false);
    });

    it("returns false for different-length strings", () => {
      expect(safeCompare("secret", "s")).toBe(false);
    });
  });

  describe("isAdminLoginConfigured", () => {
    it("is false when env vars are missing", () => {
      vi.stubEnv("ADMIN_PASSWORD", "");
      vi.stubEnv("ADMIN_SESSION_SECRET", "");
      expect(isAdminLoginConfigured()).toBe(false);
    });

    it("is true when both env vars are set", () => {
      vi.stubEnv("ADMIN_PASSWORD", "hunter2");
      vi.stubEnv("ADMIN_SESSION_SECRET", "shh");
      expect(isAdminLoginConfigured()).toBe(true);
    });
  });

  describe("session tokens", () => {
    it("accepts a freshly created token", async () => {
      vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
      const token = await createSessionToken();
      expect(await isValidSessionToken(token)).toBe(true);
    });

    it("rejects a tampered token", async () => {
      vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
      const token = await createSessionToken();
      const tampered = token.replace(/.$/, token.endsWith("0") ? "1" : "0");
      expect(await isValidSessionToken(tampered)).toBe(false);
    });

    it("rejects a token signed with a different secret", async () => {
      vi.stubEnv("ADMIN_SESSION_SECRET", "secret-a");
      const token = await createSessionToken();
      vi.stubEnv("ADMIN_SESSION_SECRET", "secret-b");
      expect(await isValidSessionToken(token)).toBe(false);
    });

    it("rejects an expired token", async () => {
      vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
      vi.useFakeTimers();
      const token = await createSessionToken();
      vi.advanceTimersByTime(1000 * 60 * 60 * 9); // past the 8h TTL
      expect(await isValidSessionToken(token)).toBe(false);
      vi.useRealTimers();
    });

    it("rejects missing/empty tokens", async () => {
      expect(await isValidSessionToken(undefined)).toBe(false);
      expect(await isValidSessionToken(null)).toBe(false);
      expect(await isValidSessionToken("")).toBe(false);
      expect(await isValidSessionToken("not-a-valid-token")).toBe(false);
    });
  });
});
