import { Page } from '@playwright/test';

export async function enterLoginPage(page: Page): Promise<void> {
  await page.goto('https://www.ploom.co.uk/en');
}