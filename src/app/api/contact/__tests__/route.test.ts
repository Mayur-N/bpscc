import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Jordan Smith",
  email: "jordan@example.com",
  phone: "+1 555 0100",
  inquiryType: "Join as a Player",
  message: "I would love to join the squad next season.",
};

describe("POST /api/contact", () => {
  it("accepts a valid submission", async () => {
    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  it("rejects an invalid email", async () => {
    const response = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));
    expect(response.status).toBe(400);
  });

  it("rejects a name that is too short", async () => {
    const response = await POST(makeRequest({ ...validPayload, name: "J" }));
    expect(response.status).toBe(400);
  });

  it("rejects an invalid inquiry type", async () => {
    const response = await POST(makeRequest({ ...validPayload, inquiryType: "Something Else" }));
    expect(response.status).toBe(400);
  });

  it("rejects a message that is too short", async () => {
    const response = await POST(makeRequest({ ...validPayload, message: "hi" }));
    expect(response.status).toBe(400);
  });

  it("rejects malformed JSON", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
