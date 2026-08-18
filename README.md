# Samet Erkalp — Portfolios

**Live site:** [sameterkalp.com](https://sameterkalp.com)

Personal website and professional presence for **Samet Erkalp** (AI & Data Science Engineer). This repository contains the source for a multilingual portfolio with project showcases, long-form writing, curated technology news, and an optional newsletter.

---

## Overview

The site presents a cohesive narrative across **work history**, **education**, **technical strengths**, and **selected projects**, together with a **blog** and a **news** section. Content is available in **English and Turkish**, with theme support for light, dark, and system preferences, and contextual display of location and local times.

---

## Site structure

| Area | Description |
|------|-------------|
| **Home** | Hero messaging, role summary, and a featured work highlight. |
| **About** | Introduction, chronological experience, studies, and grouped skills; contact and social links. |
| **Work** | Project entries with narrative context and links to external materials where applicable. |
| **Blog** | Articles on AI, data practice, security, infrastructure-style guides, and related topics. |
| **News** | Aggregated technology headlines and supplementary links. |
| **Newsletter** | Email subscription for updates on projects and new posts (where configured). |

---

## Feature

- Bilingual interface (English / Turkish)
- MDX-based blog and project pages
- Responsive layout with accessible navigation
- Newsletter and related backend integrations (see environment configuration)

---

## Technology stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **UI:** React, [Once UI](https://once-ui.com/) (`@once-ui-system/core`)
- **Content:** MDX
- **Data / services:** Supabase client, Resend (where enabled for mail flows)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- Package manager: `npm` (or compatible)

---

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Production build and run:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

---

## Configuration

Secrets and service keys are not committed to the repository. Copy **`.env.example`** to **`.env.local`**, then supply the variables required for your environment (see comments in the example file).

---

## License

This project is licensed under **CC BY-NC 4.0** (Attribution-NonCommercial). Attribution is required; commercial use is not permitted under this license.
