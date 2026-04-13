🏍️ Identify New Bikes – Playwright Automation Framework
📌 Project Overview
This project is an end-to-end automation testing framework built using Playwright with TypeScript, following the Page Object Model (POM) design pattern.
The framework automates real-world user workflows on the ZigWheels website, focusing on:

Identifying upcoming bikes based on filters
Extracting popular used car data
Validating negative login scenarios using Google Sign-In

It demonstrates advanced automation concepts such as popup handling, dynamic data extraction, structured reporting, file system operations, and robust exception handling.

🧩 Problem Statement: Identify New Bikes
✅ Functional Requirements
1. Upcoming Bikes

Display the following bike details:

Bike Name
Price
Expected Launch Date in India


Apply filters:

Manufacturer: Hero Moto Corp
Bike price below ₹4 Lakh



2. Used Cars (Chennai)

Extract all popular used car models
Display and store extracted data

3. Login Validation

Perform Google Login with invalid credentials
Capture and validate the error message


🌐 Application Under Test
👉 https://www.zigwheels.com

🧪 Automated Test Scenarios
🔹 Scenario 1: Display Upcoming Hero Bikes (Price < ₹4 Lakh)

Navigate to Upcoming Bikes
Filter by Hero Moto Corp
Extract:

Bike Name
Price
Expected Launch Date


Filter bikes priced below ₹4,00,000
Store extracted data into a JSON file
Capture screenshots for validation


🔹 Scenario 2: Extract Popular Used Car Models in Chennai

Navigate to Used Cars section
Select Chennai dynamically
Scroll to load all popular models
Extract popular used car models
Store extracted data into a JSON file


🔹 Scenario 3: Google Login with Invalid Credentials

Open ZigWheels login modal
Initiate Google Sign-In
Handle popup browser window
Enter invalid email credentials
Capture and validate error messages
Safely close popup and modal


🎯 Key Automation Scope

✅ Page Object Model (POM) design
✅ Locator segregation
✅ Multi-window & popup handling
✅ Form filling and input validation
✅ Capturing warning & error messages
✅ Dynamic UI data extraction
✅ Writing data to JSON files
✅ Screenshot capture for evidence
✅ Robust exception handling


🗂️ Project Structure
Shell├── .github/├── locators/│   ├── HomePageLocators.ts│   ├── LoginPageLocators.ts│   ├── UpcomingBikesLocators.ts│   └── UsedCarsPageLocators.ts│├── pages/│   ├── HomePage.ts│   ├── LoginPage.ts│   ├── UpcomingBikesPage.ts│   └── UsedCarsPage.ts│├── tests/│   └── hackathonProject.spec.ts│├── utils/│   └── ScreenshotHelper.ts│├── Result/│   ├── upcoming_bikes.json│   └── used_cars.json│├── screenshots/├── test-results/├── playwright.config.ts└── README.mdShow more lines

🛠️ Technology Stack

Automation Tool: Playwright
Language: TypeScript
Test Runner: Playwright Test
Design Pattern: Page Object Model (POM)
Reporting:

Playwright HTML Report
Allure Report
JUnit


Data Storage: JSON (Node.js File System)


📋 Prerequisites

Node.js (v16 or later)
npm package manager


▶️ Commands
📥 Install Dependencies
Shellnpm install playwrightShow more lines
🚀 Execute Tests
Shellnpx playwright testShow more lines
📊 View Playwright HTML Report
Shellnpx playwright show-reportShow more lines
📈 View Allure Report
Shellnpx allure serve allure-resultsShow more lines

📤 Test Output
📁 Extracted Data

Result/upcoming_bikes.json
Result/used_cars.json

📸 Screenshots

Stored inside the screenshots/ directory

📑 Reports

Playwright HTML Report
Allure Report


✅ Conclusion
This automation framework delivers a robust, scalable, and maintainable testing solution by combining UI automation with dynamic data extraction and persistent storage.
It fulfills all functional requirements while following industry-standard automation best practices, making it suitable for enterprise-level QA automation projects.

👤 Author
Automation Stack:
Playwright | TypeScript | Page Object Model (POM)
