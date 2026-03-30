import { Page, Locator, expect } from '@playwright/test';
import { LoginPageLocators } from '../locators/LoginPageLocators';

export class LoginPage {

  page: Page;
  popupPage?: Page;

  emailInput: string;
  nextButton: string;
  errorMessageLocator: string;

  loginIcon: Locator;
  googleLoginButton: Locator;
  closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginIcon = page.locator(LoginPageLocators.loginIcon);
    this.googleLoginButton = page.locator(LoginPageLocators.googleLoginButton);
    this.emailInput = LoginPageLocators.emailInputLabel;
    this.nextButton = LoginPageLocators.nextButtonText;
    this.errorMessageLocator = LoginPageLocators.errorMessageLocator;
    this.closeButton = page.locator(LoginPageLocators.closeButton);
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(LoginPageLocators.zigwheelsUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(this.page).toHaveURL(/https:\/\/www\.zigwheels\.com\/?/, { timeout: 30000 });
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 30000 });
  }

  async clickLoginIcon(): Promise<void> {
    await expect(this.loginIcon).toBeVisible({ timeout: 10000 });
    await this.loginIcon.click();
    
    // Wait for modal to appear
    await this.page.waitForSelector(LoginPageLocators.loginModal, { state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(1000);
  }

  async clickGoogleLogin(): Promise<void> {
    // Ensure modal is visible and stable
    await this.page.waitForSelector(LoginPageLocators.loginModal, { state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(500);
    
    // Wait for Google button to be visible and enabled
    await expect(this.googleLoginButton).toBeVisible({ timeout: 10000 });
    await expect(this.googleLoginButton).toBeEnabled({ timeout: 5000 });
    
    // Scroll button into view if needed
    await this.googleLoginButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup', { timeout: 15000 }).catch(() => null),
      this.googleLoginButton.click({ force: false })
    ]);
    
    this.popupPage = popup || this.page;
    
    if (this.popupPage && this.popupPage !== this.page) {
      await this.popupPage.waitForLoadState('domcontentloaded', { timeout: 15_000 });
      await this.page.waitForTimeout(2000);
    }
  }

  async enterEmail(email: string): Promise<void> {
    if (!this.popupPage) throw new Error('Popup page not available');
    const emailField = this.popupPage.getByLabel(this.emailInput);
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();
    await expect(emailField).toBeEmpty();
    await expect(emailField).toBeEditable();
    await emailField.type(email);
    await expect(emailField).toHaveValue(email);
    await this.popupPage.waitForTimeout(2000);
  }

  async clickNext(): Promise<void> {
    if (this.popupPage && !this.popupPage.isClosed()) {
      try {
        await this.popupPage.waitForSelector(`text=${this.nextButton}`, { state: 'visible', timeout: 5000 });
        await this.popupPage.getByText(this.nextButton).click();
        await this.popupPage.waitForTimeout(2000);
      } catch (error) {
        console.error('Error clicking Next button:', error);
      }
    } else {
      console.warn('popupPage is not available or already closed.');
    }
  }

  async captureErrorMessageScreenshot(path: string): Promise<void> {
    if (!this.popupPage) throw new Error('Popup page not available');
    await this.popupPage.waitForSelector(this.errorMessageLocator, { state: 'visible', timeout: 10000 });
    await this.popupPage.locator(this.errorMessageLocator).screenshot({ path });
  }

  async getForgotEmailLink(): Promise<Locator> {
    if (!this.popupPage) throw new Error('Popup page not available');
    return this.popupPage.locator(LoginPageLocators.forgotEmailButtonXPath);
  }

  async closePopups(): Promise<void> {
    if (this.popupPage && !this.popupPage.isClosed()) {
      await this.popupPage.close();
      await this.page.waitForTimeout(1000);
    }
    
    // Wait for close button to be visible before clicking
    await expect(this.closeButton).toBeVisible({ timeout: 5000 });
    await this.closeButton.click();
    await expect(this.page.locator(LoginPageLocators.closeButton)).not.toBeVisible();
    
    // Reset popupPage reference
    this.popupPage = undefined;
    
    // Wait for page to be ready for next interaction
    await this.page.waitForTimeout(1500);
  }
}

