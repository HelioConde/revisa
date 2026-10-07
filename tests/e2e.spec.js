const { test, expect } = require("@playwright/test");

test("builds a review and saves it to local history", async ({ page }) => {
  await page.goto("/");
  await page.locator("#example-button").click();
  await page.locator("#review-form").getByRole("button", { name: "Montar minha revisão" }).click();

  await expect(page.locator("#result")).toBeVisible();
  await expect(page.locator("#result-title")).toHaveText("Revolução Francesa");
  await expect(page.locator("#count-key")).not.toHaveText("0");
  await expect(page.locator(".flashcard").first()).toBeVisible();

  await page.locator("#save-session").click();
  await page.locator("#history-toggle").click();
  await expect(page.locator("#history-dialog")).toBeVisible();
  await expect(page.locator("#history-list")).toContainText("Revolução Francesa");
});

test("rejects short notes and toggles English", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject").fill("Teste");
  await page.locator("#notes").fill("curto");
  await page.locator("#review-form").getByRole("button", { name: "Montar minha revisão" }).click();
  await expect(page.locator("#result")).toBeHidden();

  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#review-form").getByRole("button")).toHaveText("Build my review");
});
