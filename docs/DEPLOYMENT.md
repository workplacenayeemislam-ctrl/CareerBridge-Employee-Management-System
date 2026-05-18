# Deployment Guide

This guide covers frontend and backend deployment for CareerBridge Employee Management.

## Backend Deployment (Google Apps Script)

1. Open Google Drive and create a new Apps Script project.
2. Copy the files from `backend/` into the Apps Script editor.
3. Update the `appsscript.json` manifest if needed.
4. Save all files.
5. Deploy the project as a web app:
   - Select `Deploy > New deployment`
   - Choose `Web app`
   - Set access to `Anyone` or `Anyone with Google account` depending on your security policy
   - Copy the deployment URL
6. Open `assets/js/config.js` and replace the placeholder `API_BASE_URL` with the deployment URL.

## Frontend Hosting

The frontend can be served from GitHub Pages or any static host.

- Push the repository to GitHub.
- For GitHub Pages, enable Pages on the repository and select the main branch root or `docs/` folder.
- The frontend will use the Apps Script API URL stored in `assets/js/config.js`.

## Testing the Deployment

1. Open `index.html` or the hosted page.
2. Use the login form to sign in.
3. Verify that API calls return JSON and that features load correctly.

## Updates

- Update backend logic in Google Apps Script and re-deploy.
- Update frontend static files in GitHub and push changes.
- Keep `API_BASE_URL` current after each Apps Script deployment.
