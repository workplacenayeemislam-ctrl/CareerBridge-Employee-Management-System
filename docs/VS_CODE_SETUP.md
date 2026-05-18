# VS Code Setup

Use Visual Studio Code to edit frontend and backend files.

## Recommended Extensions

- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens
- Markdown All in One

## Recommended Settings

Create or update `.vscode/settings.json` if needed:

```json
{
  "editor.formatOnSave": true,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true
  },
  "tailwindCSS.includeLanguages": {
    "html": "html"
  }
}
```

## Working with Apps Script

- Use the `clasp` CLI if you want local Apps Script sync.
- Keep `backend/` files organized for manual copy or `clasp` deployment.

## Previewing the Frontend

- Use Live Server or open HTML files directly.
- Refresh the browser after edits.
- Keep `assets/js/config.js` updated with the backend URL.
