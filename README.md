<small>

# Identify New Bikes – Playwright Automation Framework

## Project Overview

This project is an end-to-end automation testing framework built using Playwright with TypeScript, following the Page Object Model (POM) design pattern.  
It automates real-world user workflows on the ZigWheels website, focusing on upcoming bikes identification, used car data extraction, and negative login validation.

The framework demonstrates advanced automation concepts such as popup handling, dynamic data extraction, file system operations, and structured reporting.

------------------------------------------------------------------

## Problem Statement: Identify New Bikes

### Functional Requirements

1.Display Upcoming Bikes details including:
- Bike Name
- Price
- Expected Launch Date in India
- Manufacturer: Hero Moto Corp
- Bike price should be less than ₹4 Lakh

2.For Used Cars in Chennai:
- Extract all popular used car models
- Display and store the extracted list

3.Perform Login with Google using invalid credentials:
- Capture and validate the error message

Application Under Test:  
https://www.zigwheels.com

------------------------------------------------------------------

## Automated Test Scenarios

### Scenario 1: Display Upcoming Hero Bikes (Price < ₹4 Lakh)
- Navigate to Upcoming Bikes section
- Filter bikes for Hero Moto Corp
- Extract bike name, price, and expected launch date
- Filter bikes priced below ₹4,00,000
- Store extracted data into a JSON file
- Capture screenshots for validation

### Scenario 2: Extract Popular Used Car Models in Chennai
- Navigate to Used Cars section
- Select Chennai dynamically
- Scroll to load popular models
- Extract popular used car models
- Store extracted data into a JSON file

### Scenario 3: Google Login with Invalid Credentials
- Open ZigWheels login modal
- Initiate Google Sign-In
- Handle popup browser window
- Enter invalid email inputs
- Capture error messages
- Close popups and login modal safely

------------------------------------------------------------------

## Key Automation Scope

- Page Object Model (POM) implementation
- Locator segregation
- Handling browser windows and popups
- Form filling and input validation
- Capturing warning and error messages
- Extracting dynamic UI data
- Writing extracted data into JSON files
- Screenshot capture for execution evidence
- Robust exception handling

------------------------------------------------------------------

## Project Structure

├── .github/  
├── locators/  
│   ├── HomePageLocators.ts  
│   ├── LoginPageLocators.ts  
│   ├── UpcomingBikesLocators.ts  
│   └── UsedCarsPageLocators.ts  
│  
├── pages/  
│   ├── HomePage.ts  
│   ├── LoginPage.ts  
│   ├── UpcomingBikesPage.ts  
│   └── UsedCarsPage.ts  
│  
├── tests/  
│   └── hackathonProject.spec.ts  
│  
├── utils/  
│   └── ScreenshotHelper.ts  
│  
├── Result/  
│   ├── upcoming_bikes.json  
│   └── used_cars.json  
│  
├── screenshots/  
├── test-results/  
├── playwright.config.ts  
└── README.md  

------------------------------------------------------------------

## Technology Stack
- Automation Tool: Playwright
- Language: TypeScript
- Test Runner: Playwright Test
- Design Pattern: Page Object Model (POM)
- Reporting: Playwright HTML, Allure, JUnit
- Data Storage: JSON using Node.js File System

------------------------------------------------------------------

## Prerequisites
- Node.js (v16 or higher)
- npm package manager

------------------------------------------------------------------

## Commands
Installation : npm install playwright  
Test Execution : npx playwright test  
View Test Report : npx playwright show-report  
View Allure Report : npx allure serve allure-results  

------------------------------------------------------------------

## Test Output

Extracted Data:
- Result/upcoming_bikes.json
- Result/used_cars.json

Screenshots:
- Stored inside the screenshots directory

Reports:
- Playwright HTML Report
- Allure Report

------------------------------------------------------------------

## Conclusion

This automation framework delivers a robust and scalable testing solution by combining UI automation with dynamic data extraction and persistent storage.  
The project fulfills all functional requirements and follows industry-standard automation practices suitable for enterprise-level testing.

------------------------------------------------------------------

## Author

Leelanagasai Prasanna Gudivada


Automation Stack: Playwright | TypeScript | Page Object Model

</small>
