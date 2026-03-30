import { Page, Locator, expect } from '@playwright/test';
import { HomePageLocators } from '../locators/HomePageLocators';

export class Home {
  private page: Page;
  private url: string;
  private upcomingBikesTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = HomePageLocators.zigwheelsUrl;
    this.upcomingBikesTab = page.locator(HomePageLocators.bikeTabs).getByText(HomePageLocators.upcomingBikesText);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  async clickUpcomingBikesTab(): Promise<void> {
    await this.upcomingBikesTab.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await this.upcomingBikesTab.click();
    await this.page.waitForTimeout(2000);
  }
}
