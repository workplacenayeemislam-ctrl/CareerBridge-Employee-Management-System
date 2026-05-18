# Setup Guide

Follow these steps to prepare your local environment and run CareerBridge Employee Management.

## Prerequisites

- Visual Studio Code
- Git installed
- Google account for Apps Script and Sheets
- Internet connection for Tailwind CDN and API requests

## Local Setup

1. Clone the repository:

   ```powershell
   git clone https://github.com/YOUR_USERNAME/careerbridge-employee-management.git
   cd careerbridge-employee-management
   ```

2. Open the folder in VS Code.
3. Install recommended VS Code extensions:
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier
   - GitLens
4. Review `assets/js/config.js` and set your Apps Script URL.
5. Open the `index.html` file in your browser or use a static server extension.

## Google Sheets Setup

1. Create a new Google Sheet.
2. Create the following tabs: `Users`, `Employees`, `Attendance`, `Tasks`, `Leaves`, `Reports`, `Departments`.
3. Add the header row based on `docs/DB_SCHEMA.md`.
4. Add a sample admin row in `Users` with a unique `userId`.

## Deploy Backend

Follow the steps in `docs/DEPLOYMENT.md` to publish the Apps Script API.

## Running Locally

- Use a static server extension in VS Code to preview pages.
- Or open HTML files directly in the browser.
- Ensure the API URL in `assets/js/config.js` matches your Apps Script deployment.
