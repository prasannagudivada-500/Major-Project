# ============================================================
# 🏍️ Identify New Bikes – Playwright Automation Framework
# ============================================================

# ------------------------------------------------------------
# 📌 Project Overview
# ------------------------------------------------------------
# This project is an end-to-end automation testing framework
# built using Playwright with TypeScript, following the
# Page Object Model (POM) design pattern.
#
# The framework automates real-world workflows on the
# ZigWheels website, focusing on:
#  - Upcoming bike identification
#  - Used car data extraction
#  - Negative login validation
#
# Advanced automation concepts demonstrated:
#  - Popup and multi-window handling
#  - Dynamic data extraction
#  - File system operations
#  - Structured test reporting
#  - Robust exception handling

# ------------------------------------------------------------
# 🧩 Problem Statement: Identify New Bikes
# ------------------------------------------------------------

# Functional Requirements:
#
# 1. Upcoming Bikes
#    - Display Bike Name
#    - Display Price
#    - Display Expected Launch Date in India
#    - Manufacturer: Hero Moto Corp
#    - Bike price should be less than ₹4 Lakh
#
# 2. Used Cars (Chennai)
#    - Extract all popular used car models
#    - Display and store the extracted list
#
# 3. Login Validation
#    - Perform Google Login using invalid credentials
#    - Capture and validate error message

# ------------------------------------------------------------
# 🌐 Application Under Test
# ------------------------------------------------------------
# https://www.zigwheels.com

# ------------------------------------------------------------
# 🧪 Automated Test Scenarios
# ------------------------------------------------------------

# Scenario 1: Display Upcoming Hero Bikes (Price < ₹4 Lakh)
#  - Navigate to Upcoming Bikes section
#  - Filter bikes for Hero Moto Corp
#  - Extract:
#      - Bike Name
#      - Price
#      - Expected Launch Date
#  - Filter bikes priced below ₹4,00,000
#  - Store extracted data into a JSON file
#  - Capture screenshots for validation

# Scenario 2: Extract Popular Used Car Models in Chennai
#  - Navigate to Used Cars section
#  - Select Chennai dynamically
#  - Scroll page to load popular models
#  - Extract used car model names
#  - Store extracted data into a JSON file

# Scenario 3: Google Login with Invalid Credentials
#  - Open ZigWheels login modal
#  - Initiate Google Sign-In
#  - Handle popup browser window
#  - Enter invalid email credentials
#  - Capture error messages
#  - Safely close popup and login modal

# ------------------------------------------------------------
# 🎯 Key Automation Scope
# ------------------------------------------------------------
#  - Page Object Model (POM) implementation
#  - Locator segregation
#  - Browser window and popup handling
#  - Form filling and input validation
#  - Capturing warning and error messages
#  - Dynamic UI data extraction
#  - Writing extracted data to JSON files
#  - Screenshot capture for execution evidence
#  - Robust exception handling

# ------------------------------------------------------------
# 🗂️ Project Structure
# ------------------------------------------------------------
# .
# ├── .github/
# ├── locators/
# │   ├── HomePageLocators.ts
# │   ├── LoginPageLocators.ts
# │   ├── UpcomingBikesLocators.ts
# │   └── UsedCarsPageLocators.ts
# │
# ├── pages/
# │   ├── HomePage.ts
# │   ├── LoginPage.ts
# │   ├── UpcomingBikesPage.ts
# │   └── UsedCarsPage.ts
# │
# ├── tests/
# │   └── hackathonProject.spec.ts
# │
# ├── utils/
# │   └── ScreenshotHelper.ts
# │
# ├── Result/
# │   ├── upcoming_bikes.json
# │   └── used_cars.json
# │
# ├── screenshots/
# ├── test-results/
# ├── playwright.config.ts
# └── README.md

# ------------------------------------------------------------
# 🛠️ Technology Stack
# ------------------------------------------------------------
#  - Automation Tool: Playwright
#  - Language: TypeScript
#  - Test Runner: Playwright Test
#  - Design Pattern: Page Object Model (POM)
#  - Reporting:
#      - Playwright HTML Report
#      - Allure Report
#      - JUnit
#  - Data Storage: JSON (Node.js File System)

# ------------------------------------------------------------
# 📋 Prerequisites
# ------------------------------------------------------------
#  - Node.js (v16 or higher)
#  - npm package manager

# ------------------------------------------------------------
# ▶️ Commands
# ------------------------------------------------------------

# Install Dependencies
# npm install playwright

# Execute Tests
# npx playwright test

# View Playwright HTML Report
# npx playwright show-report

# View Allure Report
# npx allure serve allure-results

# ------------------------------------------------------------
# 📤 Test Output
# ------------------------------------------------------------

# Extracted Data:
#  - Result/upcoming_bikes.json
#  - Result/used_cars.json
#
# Screenshots:
#  - Stored inside the screenshots directory
#
# Reports:
#  - Playwright HTML Report
#  - Allure Report

# ------------------------------------------------------------
# ✅ Conclusion
# ------------------------------------------------------------
# This automation framework delivers a robust and scalable
# testing solution by combining UI automation with dynamic data extraction and persistent storage.
# The project follows industry-standard automation practices
# and is suitable for enterprise-level testing frameworks.

# ------------------------------------------------------------
# 👤 Author
# ------------------------------------------------------------
# Leelanagasai Prasanna Gudivada
# Programmer Analyst Trainee  
# Chennai, India  
# Playwright | TypeScript | Page Object Model (POM)
