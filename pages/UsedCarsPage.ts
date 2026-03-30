import { Page, Locator, expect } from '@playwright/test';
import { UsedCarsPageLocators } from '../locators/UsedCarsPageLocators';
import * as fs from 'fs';
import * as path from 'path';

export class UsedCarsPage {
  
   page: Page;

   usedCarsNavLink: Locator;
   usedCarsSubNavLink: Locator;

   popularModelList: string;
   scrollLocator: string;

  constructor(page: Page) {
    this.page = page;
    this.usedCarsNavLink = page.locator(UsedCarsPageLocators.usedCarsNavLink);
    this.usedCarsSubNavLink = page.locator(UsedCarsPageLocators.usedCarsSubNavLink);
    this.popularModelList = UsedCarsPageLocators.popularModelList;
    this.scrollLocator = UsedCarsPageLocators.scrollLocatorXPath;
  }

  async navigateToUsedCarsPage(): Promise<void> {
    // Primary path: click through the navigation menu.
    try {
      await expect(this.usedCarsNavLink).toBeVisible({ timeout: 15000 });
      await expect(this.usedCarsNavLink).toBeEnabled({ timeout: 15000 });
      await this.usedCarsNavLink.scrollIntoViewIfNeeded();
      await this.usedCarsNavLink.click();

      await expect(this.usedCarsSubNavLink).toBeVisible({ timeout: 15000 });
      await expect(this.usedCarsSubNavLink).toBeEnabled({ timeout: 15000 });
      await this.usedCarsSubNavLink.click();

      await expect(this.page).toHaveURL(/used-car/, { timeout: 20000 });
    } catch (error) {
      // Fallback: direct URL navigation when UI navigation is unstable.
      await this.page.goto('https://www.zigwheels.com/used-car', { waitUntil: 'domcontentloaded' });
      await expect(this.page).toHaveURL(/used-car/, { timeout: 20000 });
    }
  }

  async selectCity(cityName: string): Promise<void> {
    // Call the function to get a string locator
    await this.page.getByTitle(cityName).click();
    await this.page.waitForTimeout(2000);
  }

  async scrollDown(): Promise<void> {
    const scrollElement = this.page.locator(this.scrollLocator);
    await scrollElement.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await expect(scrollElement).toBeVisible();
  }

  async getPopularUsedCarModels(): Promise<string[]> {
    const resultPopular = await this.page.$(this.popularModelList);
    if (!resultPopular) {
      throw new Error('Popular models list not found');
    }

    const resultListName = await resultPopular.$$('label');
    const result: string[] = [];

    for (const name of resultListName) {
      const text = await name.textContent();
      if (text) {
        result.push(text);
      }
    }

    const cleanedPopularModels = result.map(model => model.trim());
    const filepath = path.join(__dirname, '..', 'Result/used_cars.json');
    const popularModelsDict = { "Popular Used Car Models in Chennai": cleanedPopularModels };

    fs.writeFileSync(filepath, JSON.stringify(popularModelsDict, null, 4));
    expect(cleanedPopularModels.length).toBeGreaterThan(0);

    return cleanedPopularModels;
  }
}


