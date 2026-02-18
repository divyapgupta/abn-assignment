import { test, expect } from "@playwright/test";

test("search and view show details flow", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ABN FRONTEND ASSIGNMENT/i);

  const searchInput = page.getByTestId("search-input");
  await expect(searchInput).toBeVisible();
  await searchInput.fill("Batman");

  await page.waitForTimeout(1000);

  const firstResult = page.getByTestId("show-card").first();
  await expect(firstResult).toBeVisible({ timeout: 10000 });

  await firstResult.click();

  await expect(page).toHaveURL(/\/show\/\d+/);
  await expect(page.getByTestId("show-title")).toBeVisible();
});
