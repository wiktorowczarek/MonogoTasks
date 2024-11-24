import { Page } from '@playwright/test';
import { EnglishDomain, PolishDomain } from './constants';

/**
 * Handles the cookie consent pop-up if it appears.
 * @param page - The Playwright page instance.
 */
export async function handleCookieConsent(page: Page): Promise<void> {
  const cookieCloseButton = page.locator('#onetrust-close-btn-container');
  
  if (await cookieCloseButton.isVisible({ timeout: 2000 })) {
    await cookieCloseButton.click();
    console.log('Cookie consent dismissed.');
  } else {
    console.log('No cookie consent pop-up detected.');
  }
}

/**
 * Handles the age verification pop-up if it appears.
 * @param page - The Playwright page instance.
 */
export async function handleAgeVerification(page: Page, domain: string): Promise<void> {

  const ageVerificationButton = page.locator(domain == PolishDomain ? '//html/body/div[2]/div[1]/div/div/div[5]/div/div[1]' : '//html/body/div[2]/div[1]/div/div/div[4]/div/div[1]/span/span');

  // Check if the button is visible
  if (await ageVerificationButton.isVisible({ timeout: 2000 })) {
    await ageVerificationButton.click();
    console.log('Age verification completed.');
  } else {
    console.log('No age verification pop-up detected or button not visible.');
  }
}

