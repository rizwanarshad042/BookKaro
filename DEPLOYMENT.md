# Deployment Guide (Name.com + Render + Vercel)

This project is split into two deployable apps:
- `backend` (Node/Express API)
- `frontend` (Vite React SPA)

Recommended production architecture:
- Frontend: `https://booksmart.dev`
- Frontend (www): `https://www.booksmart.dev`
- Backend API: `https://api.booksmart.dev`

## 1) Security first

If secrets were ever committed in `.env`, rotate them before deploying:
- MongoDB password/user
- JWT secret
- Cloudinary API key/secret
- Gmail app password and OAuth secrets

Then use host dashboards (Render/Vercel) for production secrets.

## 2) Backend deploy on Render

Create a new **Web Service** in Render from this repository.

Use these settings:
- Root Directory: `backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

Set environment variables in Render:
- `MONGO_URI`
- `JWT_SECRET`
- `FRONTEND_ORIGINS=https://booksmart.dev,https://www.booksmart.dev`
- `FRONTEND_URL=https://booksmart.dev`
- `BACKEND_BASE_URL=https://api.booksmart.dev`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `GMAIL_REDIRECT_URI=https://api.booksmart.dev/api/auth/gmail/callback`

After first deploy, verify Render URL health:
- `https://<your-render-service>.onrender.com/api/health`

## 3) Frontend deploy on Vercel

Create a new project in Vercel from this repository.

Use these settings:
- Framework Preset: `Other`
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Set environment variable in Vercel:
- `VITE_API_ORIGIN=https://api.booksmart.dev`

This repository includes `frontend/vercel.json` for SPA route rewrites so direct links like `/login` work in production.

## 4) Attach custom domains

In Vercel project domains, add:
- `booksmart.dev`
- `www.booksmart.dev`

In Render service custom domains, add:
- `api.booksmart.dev`

Both dashboards will show the DNS values to use. Prefer those exact values if they differ.

## 5) Add DNS records in Name.com

In Name.com DNS for `booksmart.dev`, create/update:

- Root (`@`) for Vercel:
  - Type: `A`
  - Host: `@`
  - Answer: `76.76.21.21`

- `www` for Vercel:
  - Type: `CNAME`
  - Host: `www`
  - Answer: `cname.vercel-dns.com`

- `api` for Render:
  - Type: `CNAME`
  - Host: `api`
  - Answer: `<your-render-service>.onrender.com`

DNS propagation can take from a few minutes up to 24 hours.

## 6) Verify end-to-end

1. Open `https://api.booksmart.dev/api/health`.
2. Open `https://booksmart.dev`.
3. Test signup/login.
4. Test hotel images and invoices.
5. Test booking + payment flow.

## 7) Troubleshooting

- `CORS blocked for origin`:
  - Ensure Render `FRONTEND_ORIGINS` exactly contains both domains:
  - `https://booksmart.dev,https://www.booksmart.dev`

- Frontend calls localhost in production:
  - Ensure Vercel env `VITE_API_ORIGIN` is set and project redeployed.

- Refresh on route shows 404:
  - Ensure `frontend/vercel.json` exists and Vercel Root Directory is `frontend`.

- Gmail OAuth callback mismatch:
  - Keep provider redirect URI and backend `GMAIL_REDIRECT_URI` identical.
