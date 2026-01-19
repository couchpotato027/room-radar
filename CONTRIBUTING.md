# Contributing to Room Radar

This project matches a production-level Git workflow to ensure stability and code quality.

## Branching Strategy

- **`main`**: The stable, production-ready branch. **Do not commit directly to main.**
- **`develop`**: The main integration branch. All new work starts here.
- **`feature/*`**: Individual feature branches created from `develop`.
- **`hotfix/*`**: Urgent fixes for production, created from `main`.

## Workflow

### 1. Starting a New Feature

Always start from the latest `develop` branch:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

**Naming Convention:**
- Use lowercase and hyphens: `feature/user-auth`, `feature/payment-integration`

### 2. Making Changes

- Commit often with clear, descriptive messages.
- Keep changes focused on the specific feature.

### 3. Merging Changes

1.  Push your feature branch:
    ```bash
    git push origin feature/your-feature-name
    ```
2.  Open a Pull Request (PR) against the **`develop`** branch.
3.  Request a review. Once approved, it will be merged into `develop`.

## Releasing to Production

Releases are managed by merging `develop` into `main` via a Pull Request.
