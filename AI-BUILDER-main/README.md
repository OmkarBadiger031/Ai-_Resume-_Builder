# AI Resume Builder

A React, TypeScript, and Vite resume builder with multiple resume layouts, profile-photo upload, AI-assisted writing, ATS feedback, and PDF export.

## Requirements

- Node.js 20.19+ or 22.12+ (recommended: current Node.js LTS)
- npm

## Run locally (Windows PowerShell)

From the `AI-BUILDER-main` project directory:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address printed by Vite (by default, `http://localhost:3000`). If PowerShell allows npm scripts, `npm` can be used instead of `npm.cmd`.

### AI feature security status

The current frontend still imports the Google GenAI SDK and attempts Gemini requests from the browser. Do not put a private Gemini key in `.env.local` or any `VITE_*` variable: browser-delivered code cannot keep provider secrets private. The Django backend currently provides only a health endpoint; a server-side AI endpoint must be implemented before these features can be used safely with a private key.

## Build and preview

```powershell
npm.cmd run build
npm.cmd run preview
```

The production files are written to `dist/`. No provider key is needed to build the static frontend.

## Deploy the frontend to Vercel

Import the GitHub repository into Vercel and set **Root Directory** to `AI-BUILDER-main`. Select the **Vite** framework preset. The build command is `npm run build`, and the output directory is `dist` (Vercel normally detects both automatically).

In the Vercel project settings, add this public frontend variable for the Production environment (and Preview if you use previews):

```text
VITE_API_BASE_URL=https://<your-deployed-django-host>
```

This value is public and must contain only the backend's HTTPS origin—never a Gemini key, database password, or Django secret. The variable currently configures the Vite development proxy only; the frontend has no Django HTTP API calls yet, so setting it in Vercel does not connect login, resume storage, or AI features to Django.

The Vercel rewrite in `vercel.json` sends unmatched paths to the SPA entry point. The current app uses in-page state rather than URL-based routes, but the rewrite also supports future deep links.

Before expecting frontend/backend features to work together, deploy and configure Django separately: set its `ALLOWED_HOSTS` to the backend host, set `CORS_ALLOWED_ORIGINS` to the exact Vercel site origin(s), and configure its database and secrets only in the backend hosting provider. Django currently exposes only `/api/health/`; authentication, resume APIs, and server-side Gemini endpoints are not implemented. You can check the deployed health endpoint directly, but the current frontend does not call it.

## Photo uploads

The profile photo is resized in the browser and is limited to JPG, PNG, or WebP files up to 10 MB before resizing. It is included in the resume preview and resulting PDF. Resume content, including the photo, is saved in this browser's local storage per entered email address; it is not synchronized to a server or another device.

## Production deployment: important limitations

This repository is currently a **client-side demo**, not a production-ready account service. Do not treat its sign-up/login screen as secure authentication: account records and passwords are stored in browser local storage. Resume data is stored locally in the same browser.

The frontend currently imports the Gemini SDK, but the inspected Vite configuration does not inject a key. Regardless, **never set a private Gemini API key in a public static-site build**: any key used by browser code can be extracted. Production AI features need a protected server-side API endpoint, and production user accounts and cross-device resume storage need backend authentication and persistence. The current Django scaffold does not yet provide those features.

Tailwind CSS, jsPDF, and html2canvas are compiled/bundled locally with Vite, so styling and PDF export do not depend on their CDNs at runtime. AI provider access remains client-side in this demo and must be moved behind a protected server endpoint before public production use.

Before publishing publicly, choose and configure a hosting/backend platform, implement secure server-side Gemini access and authentication, review privacy/retention for uploaded resumes, and test the deployed build (photo upload, all template previews, AI actions, ATS analysis, and PDF download). No automated test suite is configured yet.
