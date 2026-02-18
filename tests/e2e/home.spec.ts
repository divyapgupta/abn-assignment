import { test, expect } from "@playwright/test";

test("homepage view and navigation flow", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ABN FRONTEND ASSIGNMENT/i);

  const genreSections = page.getByTestId("genre-section");
  await expect(genreSections.first()).toBeVisible({ timeout: 10000 });

  const genreTitles = page.getByTestId("genre-title");
  await expect(genreTitles.first()).toBeVisible();

  const firstShowCard = genreSections.first().getByTestId("show-card").first();
  await expect(firstShowCard).toBeVisible();
  await firstShowCard.click();

  await expect(page).toHaveURL(/\/show\/\d+/);
  await expect(page.getByTestId("show-title")).toBeVisible();
});
