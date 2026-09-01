import { test, expect } from "@playwright/test";

test.describe("Admin auth gate", () => {
  test("redirects unauthenticated visitors from /admin to the login page", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("heading", { name: "Admin Login" })).toBeVisible();
  });

  test("rejects an unauthenticated API request", async ({ request }) => {
    const response = await request.get("/api/admin/content/fixtures");
    expect(response.status()).toBe(401);
  });
});
