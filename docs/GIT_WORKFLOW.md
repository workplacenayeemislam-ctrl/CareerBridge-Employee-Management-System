# Git Workflow Guide

This project uses Git and GitHub for version control and collaboration.

## Branch Strategy

- `main` — production-ready code
- `develop` — integration branch for feature work
- `feature/*` — new feature branches
- `hotfix/*` — urgent bug fixes

## Commit Naming Examples

Use meaningful commit messages with a short summary:

- `feat: add employee table and profile modal`
- `fix: resolve attendance API error handling`
- `docs: update deployment guide`
- `chore: add .gitignore and README`
- `refactor: modularize frontend API helper`

## Pull Request Process

1. Create a feature branch from `develop` or `main`.
2. Push your branch to GitHub.
3. Open a pull request and add reviewers.
4. Describe the feature, testing, and any migration steps.
5. Merge after review and testing.

## GitHub Best Practices

- Keep branches small and focused.
- Rebase or merge frequently to resolve conflicts early.
- Use PR templates if available.
- Tag releases using `v1.0.0`, `v1.1.0`, etc.
