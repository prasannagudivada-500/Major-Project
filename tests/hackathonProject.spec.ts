import { test, expect, Page } from '@playwright/test';
import { UpcomingBikesPage } from '../pages/UpcomingBikesPage';
import { UsedCarsPage } from '../pages/UsedCarsPage';
import { LoginPage } from '../pages/LoginPage';
import { Home } from '../pages/HomePage';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';

test.setTimeout(300_000); // 5 minutes for all scenarios

test.describe('Hackathon Project - Complete Test Suite', () => {

  let homePage: Home;
  let upcomingBikesPage: UpcomingBikesPage;
  let usedCarsPage: UsedCarsPage;
  let loginPage: LoginPage;

  // beforeAll hook - runs once before all tests in the suite
  test.beforeAll(async () => {
    console.log('HACKATHON TEST SUITE INITIALIZATION');
    console.log(`Start Time: ${ScreenshotHelper.getTimestamp()}`);
  });

  // beforeEach hook - runs before each test
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Initialize page objects
    homePage = new Home(page);
    upcomingBikesPage = new UpcomingBikesPage(page);
    usedCarsPage = new UsedCarsPage(page);
    loginPage = new LoginPage(page);
  });

  // afterEach hook - runs after each test
  test.afterEach(async ({ page }: { page: Page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`[${ScreenshotHelper.getTimestamp()}] Test failed - Capturing failure screenshot`);
      await ScreenshotHelper.takeScreenshotWithTimestamp(
        page,
        `FAILED_${testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}`,
        { fullPage: true }
      );
    }
  });

  // afterAll hook - runs once after all tests in the suite
  test.afterAll(async () => {
    console.log('HACKATHON TEST SUITE COMPLETED');
    console.log(`End Time: ${ScreenshotHelper.getTimestamp()}`);
  });

  test('@Smoke Complete Hackathon - All Scenarios in Sequence', async ({ page }: { page: Page }) => {

    // SCENARIO 1: Display Upcoming Hero Bikes (Price < 4 Lac)

    await test.step('Scenario 1: Display Upcoming Hero Bikes with Price < 4 Lac', async () => {
      console.log(`\n[${ScreenshotHelper.getTimestamp()}]SCENARIO 1: UPCOMING HERO BIKES`);

      // Navigate to home page
      await homePage.goto();

      // Click on Upcoming Bikes tab
      await homePage.clickUpcomingBikesTab();

      // Click on "All Upcoming Bikes" link
      await upcomingBikesPage.clickAllUpcomingBikesLink();

      // Select Hero Moto Corp brand (Honda not available on the page)
      await upcomingBikesPage.selectBrand('Hero Moto Corp');

      // Get bike details (this method already filters bikes < 4 Lac)
      const heroBikes = await upcomingBikesPage.getBikeDetails();

      // Validations
      expect(Array.isArray(heroBikes)).toBe(true);
      expect(heroBikes.length).toBeGreaterThan(0);

      console.log(`\n[${ScreenshotHelper.getTimestamp()}] Found ${heroBikes.length} Hero bikes with price < 4 Lac:`);
      heroBikes.forEach((bike, index) => {
        console.log(`\n${index + 1}. ${bike.name}`);
        console.log(`   Price: ${bike.price}`);
        console.log(`   Expected Launch: ${bike.launchDates}`);
        console.log(`   Data Price: ₹${bike.dataprice}`);

        // Validate each bike
        expect(bike.name).toContain('Hero');
        expect(parseInt(bike.dataprice || '0')).toBeLessThan(400000);
      });

      // Take screenshot with timestamp
      await ScreenshotHelper.takeScreenshotWithTimestamp(page, 'scenario1_hero_bikes', { fullPage: true });

    });

    // SCENARIO 2: Extract Popular Used Car Models in Chennai
    await test.step('Scenario 2: Extract Popular Used Car Models in Chennai', async () => {
      console.log(`\n[${ScreenshotHelper.getTimestamp()}] SCENARIO 2: USED CARS IN CHENNAI`);

      // Navigate to home page (fresh start)
      await page.goto('https://www.zigwheels.com/', { waitUntil: 'domcontentloaded' });

      // Navigate to Used Cars section
      await usedCarsPage.navigateToUsedCarsPage();
      await expect(page).toHaveURL(/used-car/);

      // Select Chennai city
      await usedCarsPage.selectCity('Chennai');
      await expect(page.locator('//h1[@id="usedcarttlID"]')).toBeVisible();

      // Scroll to popular models section
      await usedCarsPage.scrollDown();

      // Get popular used car models
      const popularModels = await usedCarsPage.getPopularUsedCarModels();

      // Validations
      expect(Array.isArray(popularModels)).toBe(true);
      expect(popularModels.length).toBeGreaterThan(0);

      console.log(`\n[${ScreenshotHelper.getTimestamp()}] Found ${popularModels.length} popular used car models in Chennai:`);
      popularModels.forEach((model, index) => {
        console.log(`${index + 1}. ${model}`);
      });

      // Take screenshot with timestamp
      await ScreenshotHelper.takeScreenshotWithTimestamp(page, 'scenario2_chennai_used_cars', { fullPage: true });

    });

    // SCENARIO 3: Google Login with Invalid Credentials
    await test.step('Scenario 3: Google Login with Invalid Credentials - Multiple Cases', async () => {
      console.log(`\n[${ScreenshotHelper.getTimestamp()}]SCENARIO 3: GOOGLE LOGIN WITH INVALID CREDENTIALS`);

      // Helper: Navigate and open Google login
      const goToGoogleLogin = async () => {
        await loginPage.navigateToHomePage();
        await page.waitForLoadState('domcontentloaded');
        await loginPage.clickLoginIcon();
        await loginPage.clickGoogleLogin();
      };

      // --- TEST CASE 3.1: Invalid email format ---
      await test.step('3.1: Invalid email format (mail@7)', async () => {
        await goToGoogleLogin();

        await loginPage.enterEmail('mail@7');
        await loginPage.clickNext();

        // Capture error message screenshot
        await loginPage.captureErrorMessageScreenshot('./screenshots/scenario3_1_invalid_email.png');

        // Cleanup
        await loginPage.closePopups();
      });

      // --- TEST CASE 3.2: Invalid phone-like input ---
      await test.step('3.2: Invalid phone-like email (1123@44657)', async () => {
        await goToGoogleLogin();

        await loginPage.enterEmail('1123@44657');
        await loginPage.clickNext();

        await loginPage.captureErrorMessageScreenshot('./screenshots/scenario3_2_invalid_phone.png');

        await loginPage.closePopups();
      });

      // --- TEST CASE 3.3: Empty email field ---
      await test.step('3.3: Empty email field - Click Next without entering email', async () => {
        await goToGoogleLogin();

        await loginPage.clickNext();

        await loginPage.captureErrorMessageScreenshot('./screenshots/scenario3_3_empty_email.png');

        // Verify error message is visible
        if (loginPage.popupPage && !loginPage.popupPage.isClosed()) {
          await expect(loginPage.popupPage.locator(loginPage.errorMessageLocator))
            .toBeVisible({ timeout: 10000 });
        }

        await loginPage.closePopups();
      });

      // --- TEST CASE 3.4: Verify login page loads correctly ---
      await test.step('3.4: Verify login page loads with social providers', async () => {
        await loginPage.navigateToHomePage();
        await page.waitForLoadState('domcontentloaded');
        await loginPage.clickLoginIcon();

        // Verify Google and Facebook options are visible
        await expect(loginPage.googleLoginButton).toBeVisible({ timeout: 10000 });
        await expect(page.getByText(/facebook/i)).toBeVisible({ timeout: 10_000 });

        // Take screenshot of login modal with timestamp
        await ScreenshotHelper.takeScreenshotWithTimestamp(page, 'scenario3_4_login_modal');

        // Close the modal
        await loginPage.closeButton.click();
      });

      // Final screenshot with timestamp
      await ScreenshotHelper.takeScreenshotWithTimestamp(page, 'scenario3_final');

    });

    // FINAL SUMMARY
    console.log(`[${ScreenshotHelper.getTimestamp()}] ✓ Scenario 1: Hero bikes < 4 Lac displayed and saved`);
    console.log(`[${ScreenshotHelper.getTimestamp()}] ✓ Scenario 2: Chennai used car models extracted and saved`);
    console.log(`[${ScreenshotHelper.getTimestamp()}] ✓ Scenario 3: Google login error messages captured`);
  });
});




