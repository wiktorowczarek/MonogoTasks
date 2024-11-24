import { Page } from '@playwright/test';
import { EnglishDomain, PolishDomain } from './constants';

export function getProductPageElements(page: Page, domain: string) {
  return {
    shopButton: page.locator(`[data-testid="headerItem-${domain ==  PolishDomain ? '1' : '0'}"]`),
    shopMenuIndicator: page.locator('[data-page-name="shop"]'),
    productBySKU: (sku: string) => page.locator(`[data-sku="${sku}"]`),
    addToCartButton: page.locator('[data-testid="pdpAddToProduct"]'),
    basketCount: page.locator('.IconLabeled-module-label-fmiDL.mini-cart__icon-label'),
    openBasket: page.locator('[data-testid="cart"]'),
    basketMenu: page.locator('.mini-cart mini-cart--open mini-cart--with-items'),
  };
}

export function getBasketPageElements(page: Page) {
  return {
    basketContainer: page.locator('[data-testid="mini-cart-header"]'),
    itemList: page.locator('[data-testid="mini-cart-list"]'),
    getItemTitle: page.locator('.ProductMiniature-module-productName-cu7Vu'),
    getItemPrice: page.locator('[data-testid="mini-cart-list"] .FormattedPrice-module-price-eDdEl'),
    checkoutButton: page.locator('[data-testid="miniCartCheckoutButton"]'),
    removeButton: page.locator('[data-testid="cartRemoveButton"]')
  };
}