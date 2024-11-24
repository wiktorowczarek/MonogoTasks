import { test, expect } from '@playwright/test';
import { EnglishDomain, PolishDomain, BaseURLs, ProductSKUs } from './constants';
import { getProductPageElements, getBasketPageElements } from './elements';
import { handleCookieConsent, handleAgeVerification } from './helpers';

async function verifyProductInBasket(
  page,
  expectedTitle: string,
  expectedPrice: string
) {
  const basket = getBasketPageElements(page);

  // Ensure the basket is visible
  await expect(basket.basketContainer).toBeVisible();

  // Verify the product title
  const title = basket.getItemTitle;
  await expect(title).toHaveText(expectedTitle);

  // Verify the product price
  const price = basket.getItemPrice;
  await expect(price).toHaveText(expectedPrice);
}

async function removeProductFromBasket(page, domain) {
  const basket = getBasketPageElements(page);
  const elements = getProductPageElements(page, domain);

  // Ensure the basket is visible
  await expect(basket.basketContainer).toBeVisible();

  await basket.removeButton.click();

  // Wait for the product to be removed from the basket
  await expect(basket.getItemTitle).toBeHidden();

  // Verify that the basket count is updated (it should be zero)
  await expect(elements.basketCount).toBeHidden();
}

async function openProductPage(page, baseURL, productSKU, domain) {
  // Step 1: Enter the site
  await page.goto(baseURL);

  await handleCookieConsent(page);
  await handleAgeVerification(page, domain);

  const elements = getProductPageElements(page, domain);

  // Step 2: Click "Shop"
  await elements.shopButton.click();
  await expect(elements.shopMenuIndicator).toBeDefined();

  // Close active item (shop) submenu
  const shopMenuItem = await page.locator('.navigation__item--active');
  if (await shopMenuItem.isVisible()) {
    const closeButton = shopMenuItem.locator('[data-testid="CloseShopMenu"]');
    await closeButton.click();
  }

  // Step 3: Open product page by SKU
  const productLocator = elements.productBySKU(productSKU);
  await productLocator.waitFor({ state: 'visible', timeout: 30000 });
  await productLocator.scrollIntoViewIfNeeded();
  await productLocator.click();
}

async function addProductToCart(page, expectedTitle, expectedPrice, domain) {
  const elements = getProductPageElements(page, domain);

  // Step 4: Add product to the cart
  await elements.addToCartButton.click();

  // Step 5: Check basket count
  await expect(elements.basketCount).toHaveText('1');

  // Step 6: Open the basket if it's not opened already
  const isBasketOpened = await page.locator('.mini-cart mini-cart--open mini-cart--with-items');
  if (!isBasketOpened) {
    await elements.openBasket.click();
  }

  // Step 7: Check if product is in the basket
  await verifyProductInBasket(page, expectedTitle, expectedPrice);
}

async function verifyLinksAndImages(page) {
  // Step 1: Get all links on the page
  const links = await page.locator('a[href]').all();
  
  const fullLinks = [];
  for (let link of links) {
    const url = await link.getAttribute('href');
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      fullLinks.push(url);
    }
  }

  // Step 2: Verify that each full link is reachable
  for (let url of fullLinks) {
    const response = await page.goto(url);
    expect(response.ok()).toBe(true);
  }

  // Step 3: Get all images on the page
  const images = await page.locator('img').all();
  
  const fullImageSources = [];
  for (let img of images) {
    const src = await img.getAttribute('src');
    if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
      fullImageSources.push(src);
    }
  }

  // Step 4: Verify that each full image source is loading correctly
  for (let src of fullImageSources) {
    const response = await page.goto(src);
    expect(response.ok()).toBe(true);
  }
}

test.describe.parallel('Ploom Add Product Tests', () => {
  test(`Verify adding a product to the cart (${EnglishDomain} site)`, async ({ page }) => {
    const baseURL = BaseURLs[EnglishDomain];
    const productSKU = ProductSKUs.PloomXAdvanced;
    const expectedTitle = 'Ploom X Advanced Black';
    const expectedPrice = '£10.00';

    await openProductPage(page, baseURL, productSKU, EnglishDomain);
    await addProductToCart(page, expectedTitle, expectedPrice, EnglishDomain)
  });

  test(`Verify adding a product to the cart (${PolishDomain} site)`, async ({ page }) => {
    const baseURL = BaseURLs[PolishDomain];
    const productSKU = ProductSKUs.PloomXAdvancedPL;
    const expectedTitle = 'Ploom X Advanced Red by Ora ïto';
    const expectedPrice = '99,00 zł';

    await openProductPage(page, baseURL, productSKU, PolishDomain);
    await addProductToCart(page, expectedTitle, expectedPrice, PolishDomain)
  });
});

test.describe.parallel('Ploom Remove Product Tests', () => {
  test(`Verify removing a product from the cart (${EnglishDomain} site)`, async ({ page }) => {
    const baseURL = BaseURLs[EnglishDomain];
    const productSKU = ProductSKUs.PloomXAdvanced;
    const expectedTitle = 'Ploom X Advanced Black';
    const expectedPrice = '£10.00';

    await openProductPage(page, baseURL, productSKU, EnglishDomain);
    await addProductToCart(page, expectedTitle, expectedPrice, EnglishDomain)
    await removeProductFromBasket(page, EnglishDomain)
  });

  test(`Verify removing a product from the cart (${PolishDomain} site)`, async ({ page }) => {
    const baseURL = BaseURLs[PolishDomain];
    const productSKU = ProductSKUs.PloomXAdvancedPL;
    const expectedTitle = 'Ploom X Advanced Red by Ora ïto';
    const expectedPrice = '99,00 zł';

    await openProductPage(page, baseURL, productSKU, PolishDomain);
    await addProductToCart(page, expectedTitle, expectedPrice, PolishDomain)
    await removeProductFromBasket(page, PolishDomain)
  });
});

test.describe.parallel('Ploom Links Product Tests', () => {
  test(`Verify Links and Images on product tab (${EnglishDomain} site)`, async ({ page }) => {
    const baseURL = BaseURLs[EnglishDomain];
    const productSKU = ProductSKUs.PloomXAdvanced;

    await openProductPage(page, baseURL, productSKU, EnglishDomain);
    await verifyLinksAndImages(page);
  });

  test(`Verify Links and Images on product tab (${PolishDomain} site)`, async ({ page }) => {
    const baseURL = BaseURLs[PolishDomain];
    const productSKU = ProductSKUs.PloomXAdvancedPL;

    await openProductPage(page, baseURL, productSKU, PolishDomain);
    await verifyLinksAndImages(page);
  });
});