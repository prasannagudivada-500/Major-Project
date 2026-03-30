import { Page, Locator, expect } from '@playwright/test';
import { UpcomingBikesLocators } from '../locators/UpcomingBikesLocators';
import * as fs from 'fs';
import * as path from 'path';

interface Bike {
  name: string;
  price: string;
  launchDates: string;
  dataprice: string;
}

export class UpcomingBikesPage {
   page: Page;
   allUpcomingBikesLink: Locator;
   modelNameLocator: Locator;
   modelPriceLocator: Locator;
   modelLaunchDateLocator: Locator;
   dataprice: Locator;
   scrollBikes: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allUpcomingBikesLink = page.locator(UpcomingBikesLocators.allUpcomingBikesLink);
    this.modelNameLocator = page.locator(UpcomingBikesLocators.modelNameLocator);
    this.modelPriceLocator = page.locator(UpcomingBikesLocators.modelPriceLocator);
    this.modelLaunchDateLocator = page.locator(UpcomingBikesLocators.modelLaunchDateLocator);
    this.dataprice = page.locator(UpcomingBikesLocators.dataPriceLocator);
    this.scrollBikes = page.locator(UpcomingBikesLocators.scrollBikesLocator);
  }

  async clickAllUpcomingBikesLink(): Promise<void> {
    await this.allUpcomingBikesLink.click();
    await this.page.waitForTimeout(2000);
  }

  async selectBrand(brandName: string): Promise<void> {
    const brandLink = this.page.getByRole('link', { name: brandName, exact: true });
    
    // Wait for brand link with explicit timeout and better error message
    await expect(brandLink).toBeVisible({ timeout: 15_000 });
    
    await brandLink.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await brandLink.click();
    await this.modelNameLocator.first().waitFor({ state: 'visible', timeout: 10_000 });
  }

  async getBikeDetails(): Promise<Bike[]> {
    await this.scrollBikes.scrollIntoViewIfNeeded();
    
    const modelNameTitles = await this.modelNameLocator.allTextContents();
    const modelPrices = await this.modelPriceLocator.allTextContents();
    const modelLaunchDates = await this.modelLaunchDateLocator.allTextContents();
    const modeldataprice = await this.dataprice.evaluateAll(elements =>
      elements.map(el => el.getAttribute('data-price'))
    );

    if (
      !modelNameTitles || !modelPrices || !modelLaunchDates || !modeldataprice ||
      !Array.isArray(modelNameTitles) || modelNameTitles.length === 0
    ) {
      throw new Error('Bike details not loaded or not in expected format');
    }

    const bikes: Bike[] = modelNameTitles.map((name, index) => ({
      name: name?.trim() || 'N/A',
      price: modelPrices[index] || 'N/A',
      launchDates: modelLaunchDates[index] || 'N/A',
      dataprice: modeldataprice[index] || '0',
    }));

    const filteredBikes = bikes.filter(bike => parseInt(bike.dataprice || '0') < 400000);

    const filepath = path.join(__dirname, '..', 'Result/upcoming_bikes.json');
    const popularModelsDict = { "Upcoming bikes list": filteredBikes };
    fs.writeFileSync(filepath, JSON.stringify(popularModelsDict, null, 4));

    expect(fs.existsSync(filepath)).toBe(true);

    await this.page.waitForTimeout(2000);
    await this.page.screenshot({ path: UpcomingBikesLocators.screenshotPath });

    return filteredBikes;
  }
}


