import { describe, expect, it, vi, beforeEach } from "vitest";
import { GET, PUT } from "@/app/api/admin/content/[collection]/route";

vi.mock("node:fs", () => {
  const promises = { readFile: vi.fn(), writeFile: vi.fn() };
  return { promises, default: { promises } };
});

const { promises: fsPromises } = await import("node:fs");

function makeParams(collection: string) {
  return { params: Promise.resolve({ collection }) };
}

function makeGetRequest() {
  return new Request("http://localhost/api/admin/content/fixtures");
}

function makePutRequest(body: unknown) {
  return new Request("http://localhost/api/admin/content/fixtures", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("GET /api/admin/content/[collection]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 for an unknown collection", async () => {
    const response = await GET(makeGetRequest(), makeParams("not-a-real-collection"));
    expect(response.status).toBe(404);
  });

  it("returns parsed JSON for a known collection", async () => {
    vi.mocked(fsPromises.readFile).mockResolvedValue('[{"id":"f1"}]');
    const response = await GET(makeGetRequest(), makeParams("fixtures"));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toEqual([{ id: "f1" }]);
  });

  it("returns 500 if the file can't be read", async () => {
    vi.mocked(fsPromises.readFile).mockRejectedValue(new Error("boom"));
    const response = await GET(makeGetRequest(), makeParams("fixtures"));
    expect(response.status).toBe(500);
  });
});

describe("PUT /api/admin/content/[collection]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 for an unknown collection", async () => {
    const response = await PUT(makePutRequest({ data: [] }), makeParams("nope"));
    expect(response.status).toBe(404);
  });

  it("rejects a non-array payload for an array collection", async () => {
    const response = await PUT(makePutRequest({ data: { not: "an array" } }), makeParams("fixtures"));
    expect(response.status).toBe(400);
  });

  it("rejects entries missing an id", async () => {
    const response = await PUT(makePutRequest({ data: [{ opponent: "x" }] }), makeParams("fixtures"));
    expect(response.status).toBe(400);
  });

  it("rejects duplicate ids", async () => {
    const response = await PUT(
      makePutRequest({ data: [{ id: "f1" }, { id: "f1" }] }),
      makeParams("fixtures")
    );
    expect(response.status).toBe(400);
  });

  it("rejects a non-object payload for an object collection", async () => {
    const response = await PUT(makePutRequest({ data: [1, 2, 3] }), makeParams("club"));
    expect(response.status).toBe(400);
  });

  it("writes valid data and returns ok", async () => {
    vi.mocked(fsPromises.writeFile).mockResolvedValue(undefined);
    const response = await PUT(makePutRequest({ data: [{ id: "f1" }] }), makeParams("fixtures"));
    expect(response.status).toBe(200);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(1);
    const [writtenPath, writtenContent] = vi.mocked(fsPromises.writeFile).mock.calls[0];
    expect(String(writtenPath)).toContain("fixtures.json");
    expect(JSON.parse(String(writtenContent))).toEqual([{ id: "f1" }]);
  });
});
