import { test, expect } from "@playwright/test";

const PAGES: { path: string; label: string; heading: RegExp }[] = [
  { path: "/about", label: "About", heading: /The Story of/i },
  { path: "/committee", label: "Committee", heading: /Committee & Management/i },
  { path: "/squad", label: "Squad", heading: /Player Profiles/i },
  { path: "/fixtures", label: "Fixtures", heading: /Fixtures & Results/i },
  { path: "/gallery", label: "Gallery", heading: /Upcoming Events/i },
  { path: "/sponsors", label: "Sponsors", heading: /Sponsors & Partners/i },
  { path: "/contact", label: "Contact", heading: /Contact & Membership Inquiry/i },
];

test.describe("Primary navigation", () => {
  for (const { path, label, heading } of PAGES) {
    test(`nav link to ${path} loads the right page`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("link", { name: label, exact: true }).first().click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
    });
  }

  test("mobile menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByLabel("Toggle navigation menu").click();
    await page.getByRole("banner").getByRole("link", { name: "Squad", exact: true }).click();

    await expect(page).toHaveURL(/\/squad$/);
  });
});
