# OrangeHRM Automation Framework

## 🚀 Overview
Playwright + TypeScript automation framework for 
OrangeHRM built using AI (GitHub Copilot).

## 🛠️ Tech Stack
- Playwright
- TypeScript
- Page Object Model
- GitHub Copilot (AI Assisted)
- GitHub Actions CI/CD
- Allure Reports

## 🌐 Application Under Test
- URL: https://opensource-demo.orangehrmlive.com
- Domain: HR Enterprise Application

## 📋 Test Coverage
### UI Tests (11)
- Login (valid/invalid)
- Dashboard (verify/logout)
- Employee Management
- Leave Management
- Admin User Management
- Recruitment

### API Tests (5)
- GET Employees
- GET Holidays
- GET Job Titles
- GET Locations
- GET Nationalities

## 🏃 How to Run
npm install
npx playwright test

## 📊 Generate Allure Report
npx playwright test --reporter=allure-playwright
npx allure generate allure-results --clean
npx allure open

## 🔗 CI/CD
GitHub Actions runs on every push to main branch