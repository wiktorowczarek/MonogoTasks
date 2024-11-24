import { Page } from '@playwright/test';

export function getLoginPageElements(page: Page) {
  return {
    loginTitle: page.locator('xpath=//'),
    loginInput: page.locator('#\\:r2\\:'),
  };
}