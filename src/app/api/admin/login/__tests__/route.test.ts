import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/admin/login/route";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/admin/login", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns 503 when admin login isn't configured", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");
    const response = await POST(makeRequest({ password: "anything" }));
    expect(response.status).toBe(503);
  });

  it("returns 401 for an incorrect password", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "correct-horse");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
    const response = await POST(makeRequest({ password: "wrong" }));
    expect(response.status).toBe(401);
  });

  it("returns 400 for malformed JSON", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "correct-horse");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
    const request = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("sets a session cookie on success", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "correct-horse");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
    const response = await POST(makeRequest({ password: "correct-horse" }));
    expect(response.status).toBe(200);
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain(ADMIN_SESSION_COOKIE);
    expect(setCookie).toContain("HttpOnly");
  });
});
