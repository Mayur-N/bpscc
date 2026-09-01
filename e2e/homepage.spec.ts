import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders hero, match ticker, and stats", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Fearless on the Field/i })).toBeVisible();
    await expect(page.getByText("Next Fixture")).toBeVisible();
    await expect(page.getByText("Trophies Won")).toBeVisible();
  });

  test("has working primary calls to action", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "View Fixtures" }).click();
    await expect(page).toHaveURL(/\/fixtures$/);
  });
});
