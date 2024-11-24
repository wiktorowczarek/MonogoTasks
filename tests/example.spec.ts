import { test, expect, chromium } from '@playwright/test';
import { enterLoginPage } from './helpers';
import { getLoginPageElements } from './elements';

test('login test', async ({ page }) => {

  await enterLoginPage(page);
  const elements = getLoginPageElements(page);

});