# CareerBridge Employee Management

CareerBridge Employee Management is a production-ready HR operations dashboard built with HTML, Tailwind CSS, JavaScript, Google Apps Script, and Google Sheets.

## Project Overview

- **Frontend:** HTML + Tailwind CSS + vanilla JavaScript
- **Backend:** Google Apps Script REST API
- **Database:** Google Sheets spreadsheet data store
- **Hosting:** GitHub repository + Google Apps Script web app
- **IDE:** VS Code

## Key Modules

- Authentication
- Dashboard
- Employee Management
- Attendance Management
- Task Management
- Leave Management
- Reporting System
- Admin Panel

## Features

- Modern dashboard UI with glassmorphism and dark/light mode
- Responsive layout with sidebar navigation
- RESTful API integration using `fetch()` and `async/await`
- Clean modular architecture for frontend and backend
- Prepared for GitHub hosting and future Firebase migration

## Getting Started

1. Clone the repository.
2. Open the project in VS Code.
3. Review `docs/SETUP.md` for environment setup.
4. Deploy the backend using Google Apps Script.
5. Update `assets/js/config.js` with your Apps Script URL.

## Project Architecture

- `index.html` — login and public entry point
- `dashboard.html` — main dashboard page
- `employees.html` — employee CRUD and profile pages
- `attendance.html` — attendance tracking interface
- `tasks.html` — task management page
- `leaves.html` — leave request dashboard
- `reports.html` — analytics and reporting
- `admin.html` — admin user and department settings
- `assets/css/style.css` — theme and glassmorphism styles
- `assets/js` — reusable page modules, API layer, UI toolkit
- `backend/` — Apps Script REST API files, data handlers, manifest
- `docs/` — setup, deployment, database schema, Git workflow, VS Code docs

## GitHub & Workflow

See `docs/GIT_WORKFLOW.md` for commit naming examples, branch strategies, and Pull Request guidance.

## Deployment

See `docs/DEPLOYMENT.md` for deploying the frontend and backend.

## Support

Use beginner-friendly comments inside code files to understand architecture and APIs. Follow the docs if you are new to GitHub or Apps Script.
