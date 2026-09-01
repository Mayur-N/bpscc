import { test, expect } from "@playwright/test";

test.describe("Squad page", () => {
  test("filters players by role", async ({ page }) => {
    await page.goto("/squad");

    const cardCountBefore = await page.locator("dl").count();
    await page.getByRole("button", { name: "Wicket-Keeper" }).click();
    const cardCountAfter = await page.locator("dl").count();

    expect(cardCountAfter).toBeLessThan(cardCountBefore);
  });

  test("searching for a player narrows the list", async ({ page }) => {
    await page.goto("/squad");

    await page.getByPlaceholder("Search players...").fill("zzz-no-such-player");
    await expect(page.getByText("No players match your search.")).toBeVisible();
  });
});

test.describe("Fixtures page", () => {
  test("switches between upcoming fixtures and past results", async ({ page }) => {
    await page.goto("/fixtures");

    await expect(page.getByText(/vs/i).first()).toBeVisible();
    await page.getByRole("button", { name: "Past Results" }).click();
    await expect(page.getByText(/Won|Lost|Draw/).first()).toBeVisible();
  });
});
