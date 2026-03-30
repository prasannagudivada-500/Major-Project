import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class ScreenshotHelper {
  static async takeScreenshotWithTimestamp(
    page: Page,
    screenshotName: string,
    options: { fullPage?: boolean } = { fullPage: false }
  ): Promise<string> {
    const now = new Date();
    const dateFolder = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .split('.')[0];
    
    const fileName = `${screenshotName}_${timestamp}.png`;
    const screenshotPath = path.join('./screenshots', dateFolder, fileName);
    
    // Ensure screenshots directory with date folder exists
    const dir = path.dirname(screenshotPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: options.fullPage 
    });
    
    console.log(`Screenshot saved: ${screenshotPath}`);
    return screenshotPath;
  }


  static async takeElementScreenshotWithTimestamp(
    page: Page,
    selector: string,
    screenshotName: string
  ): Promise<string> {
    const now = new Date();
    const dateFolder = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .split('.')[0];
    
    const fileName = `${screenshotName}_${timestamp}.png`;
    const screenshotPath = path.join('./screenshots', dateFolder, fileName);
    
    // Ensure screenshots directory with date folder exists
    const dir = path.dirname(screenshotPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const element = page.locator(selector);
    await element.screenshot({ path: screenshotPath });
    
    console.log(`Element screenshot saved: ${screenshotPath}`);
    return screenshotPath;
  }


//Gets formatted timestamp for logging
  static getTimestamp(): string {
    return new Date().toISOString();
  }
}
