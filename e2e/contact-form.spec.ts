import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("shows validation for an incomplete submission", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Full Name").fill("A");
    await page.getByRole("button", { name: "Send Message" }).click();

    // Native HTML validation blocks submission (minLength=2 on name).
    await expect(page.getByLabel("Full Name")).toHaveJSProperty("validity.valid", false);
  });

  test("submits successfully with valid data", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Full Name").fill("Jordan Smith");
    await page.getByLabel("Email").fill("jordan@example.com");
    await page.getByLabel("Inquiry Type").selectOption("General Query");
    await page.getByLabel("Message").fill("I would like to know more about training sessions.");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Thanks for reaching out!")).toBeVisible();
  });
});
