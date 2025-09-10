
# QA Assessment Solution — Playwright (TypeScript)

This repo contains an end‑to‑end UI + API automation solution for the **Kinetik QA Engineer (Level 3) Assessment Task** using **Playwright**.

## Tech
- Playwright @ TypeScript
- Page Object Model (POM)
- Parallel, cross‑browser (Chromium + Firefox)
- HTML report, screenshots, traces
- GitHub Actions CI (artifacts: reports, traces, invoice download)

## Setup

```bash
# 1) Install deps
npm i

# 2) Install browsers
npx playwright install --with-deps
```

## Running Tests

```bash
# Run all tests in parallel (default: chromium + firefox)
npm test

# Only API tests
npm run api

# Only E2E purchase flow
npm run e2e

# Headed mode for debugging
npm run test:headed
```

### Notes
- Invoice downloads to `downloads/invoices/` and is validated for existence and non‑zero size.
- Reports:
  - HTML report: `playwright-report/`
  - Traces & screenshots for failures: `test-results/`

## CI/CD (GitHub Actions)

A workflow is provided in `.github/workflows/ci.yml` that:
- Installs dependencies & browsers
- Runs Playwright tests
- Uploads artifacts: `playwright-report`, `test-results`, and `downloads/invoices`

To enable the status badge, push this project to your public GitHub repo. Then copy the badge URL from GitHub Actions and paste below.

## Parallel & Cross‑Browser

Configured in `playwright.config.ts` with projects for **chromium** and **firefox** and `fullyParallel: true`. Increase `workers` as needed.

## Design & Structure

```
src/
  pages/          # POM classes for Home, Login, Cart, Checkout
  utils/          # data builders, API client
tests/
  api.createAccount.spec.ts
  e2e.purchase.spec.ts
downloads/
  invoices/       # saved invoice files
.github/workflows/ci.yml
```

## Known Limitations
- Selectors are based on the current public site and may need small tweaks if the markup changes.
- The payment form here uses test data; no real card is used.

---
