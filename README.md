# Swift Start

Standalone South African business launch platform — initial GitHub prototype.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server 8080` in this directory and visit http://localhost:8080.

## Implemented

- Responsive marketing website and proposed pricing.
- Six-step conversational onboarding, conditional sole proprietor / Pty Ltd and employer-registration guidance.
- Auto-save to browser localStorage, back/forward navigation and basic validation.
- Rule-based smart suggestions for names and registration tasks (NOT a connected AI model).
- Customer launch plan and generated starter storefront preview.
- Explicit demo disclaimers and no fake filings or payment confirmations.

## Not production-ready

This is a frontend prototype. It has **no secure backend, authentication, database, AI provider, payments, registrar API, government filing integration or operational dashboard**. Data is saved only in the current browser and should not be treated as secure storage. Do not collect ID numbers or sensitive documents until a protected backend with appropriate access controls is deployed.

## Production roadmap

1. React/TypeScript migration, Supabase project with auth, RLS, audit logging and private document storage.
2. Real AI assistance via server-side LLM API with consent, data minimization, clear review steps and human approval for tax/legal decisions.
3. Secure onboarding autosave, identity verification and role-based customer/operations/admin dashboards.
4. CIPC and SARS staff-assisted filing workflow; integrate approved APIs only when authorized.
5. Domains.co.za registrar API and domain ownership/renewal lifecycle.
6. Paystack payments with verified webhooks, invoices and refunds.
7. Online store templates, product management, payment provider activation and custom domains.
8. Transactional emails, reminders, observability, integration tests, POPIA and security review.
9. GitHub Actions CI and Vercel deployment.

Swift Start is separate from Account On Me. No third-party registrations, domains or payments occur in this prototype.
