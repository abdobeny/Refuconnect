# Deploying RefuConnect for free

This guide deploys the app on a **100% free** stack:

| Part | Host | Free tier |
|------|------|-----------|
| React SPA (`frontend/`) | **Vercel** | Free, no card |
| Laravel API + Filament (`backend/`) | **Render** (Docker web service) | Free, no card, sleeps when idle |
| PostgreSQL database | **Neon** (or Supabase) | Free, no card, no expiry |
| Image uploads (optional) | **Cloudflare R2** / Backblaze B2 | 10 GB free |

```
Browser ──► Vercel (React SPA)
                │  fetch https://refuconnect-api.onrender.com/api
                ▼
          Render (Docker: nginx + php-fpm, Laravel 13 + Filament 5)
                │
                ▼
          Neon (PostgreSQL)
```

The two files that make this work are already in the repo:

- `render.yaml` — Render blueprint for the backend
- `backend/Dockerfile` + `backend/docker/*` — the container image
- `frontend/vercel.json` — Vercel SPA config (deep links, caching)

---

## 0. Prerequisites

- The code pushed to a **GitHub** repository.
- A free account on [Neon](https://neon.tech), [Render](https://render.com) and [Vercel](https://vercel.com).
- Locally (to generate a key and, optionally, seed data): PHP 8.3 + Composer.

Generate an application key you can paste into Render:

```bash
cd backend
php artisan key:generate --show
# or, without PHP installed:
echo "base64:$(openssl rand -base64 32)"
```

---

## 1. Create the database (Neon)

1. Create a project in Neon, region **EU Central** (closest to Morocco).
2. Copy the connection details. A Neon connection string looks like:
   `postgresql://USER:PASSWORD@ep-xxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`
3. Split it into the values you'll set on Render:

   | Render env var | Value from the string |
   |---|---|
   | `DB_HOST` | `ep-xxxx-pooler.eu-central-1.aws.neon.tech` |
   | `DB_PORT` | `5432` |
   | `DB_DATABASE` | `neondb` |
   | `DB_USERNAME` | `USER` |
   | `DB_PASSWORD` | `PASSWORD` |
   | `DB_SSLMODE` | `require` |

Supabase works the same way (use the **pooler** host and port `5432`).

---

## 2. Deploy the backend (Render)

1. Render dashboard → **New +** → **Blueprint** → connect your GitHub repo.
   Render reads `render.yaml` and proposes the `refuconnect-api` service.
2. Fill in the variables marked `sync: false` (Render will prompt for them):

   | Variable | Value |
   |---|---|
   | `APP_KEY` | the `base64:...` key from step 0 |
   | `APP_URL` | leave as the Render URL (e.g. `https://refuconnect-api.onrender.com`) — update after first deploy if the name differs |
   | `FRONTEND_URL` | your Vercel URL (fill after step 3) |
   | `CORS_ALLOWED_ORIGINS` | your Vercel URL (fill after step 3) |
   | `DB_HOST` / `DB_DATABASE` / `DB_USERNAME` / `DB_PASSWORD` | from step 1 |

   `DB_CONNECTION=pgsql` and `DB_SSLMODE=require` are already set by the blueprint.
3. Click **Apply**. The first build takes a few minutes (installs PHP extensions,
   runs `composer install`, builds the Filament assets with Node).
4. The container's start script runs automatically on every boot:
   `package:discover` → `config:clear` → `storage:link` → `migrate --force` →
   `config:cache` → `view:cache` → start nginx + php-fpm.
5. Health check: `GET https://<your-app>.onrender.com/up` should return `200`.
6. Admin panel: `https://<your-app>.onrender.com/admin`.

> **Free tier**: the service sleeps after ~15 min of inactivity, so the first
> request after a while takes 30–60 s to wake up. Data is safe because it lives
> in Neon, not on the instance.

### Seed the demo data (optional, one time)

The seeders create the admin account and sample animals. Set `RUN_SEEDER=1` in
Render → Environment, then trigger a manual deploy/restart. When the log shows
`Seeding database`, set it back to `0`.

Default accounts created by the seeder:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@refuconnect.com` | `admin123` |
| User | `jean@example.com` | `password123` |

**Change or delete these before sharing the link publicly.**

---

## 3. Deploy the frontend (Vercel)

1. Vercel → **Add New… → Project** → import the same repo.
2. Set **Root Directory** to `frontend`. Vercel detects Vite and reads
   `frontend/vercel.json` (build `npm run build`, output `dist`, SPA rewrites).
3. Add **Environment Variables** (Production **and** Preview). These are baked
   into the bundle at build time:

   | Variable | Value |
   |---|---|
   | `VITE_API_URL` | `https://<your-app>.onrender.com/api` |
   | `VITE_API_ORIGIN` | `https://<your-app>.onrender.com` |
   | `VITE_ADMIN_URL` | `https://<your-app>.onrender.com/admin` |

4. **Deploy**. You get a URL like `https://refuconnect.vercel.app`.

---

## 4. Wire the two together

The backend needs to know the frontend URL, and the frontend already knows the
backend URL (step 3). On Render, set:

```
FRONTEND_URL=https://refuconnect.vercel.app
CORS_ALLOWED_ORIGINS=https://refuconnect.vercel.app
```

Save — Render redeploys automatically. That's it: log in, and the "Voir le site"
button in Filament will bridge back to the SPA.

> If you use a **Preview** deployment URL or a custom domain, add each origin to
> `CORS_ALLOWED_ORIGINS` (comma-separated) and redeploy the backend.

---

## 5. Custom domains (optional)

- Vercel → Project → **Domains** → add `refuconnect.example` and follow the DNS instructions.
- Render → Service → **Settings → Custom Domains** → add `api.refuconnect.example`.
- After changing domains, update `APP_URL`, `FRONTEND_URL`, `CORS_ALLOWED_ORIGINS`
  on Render and rebuild the frontend with the new `VITE_*` values.

---

## Nice to know

### Uploaded images are ephemeral
The free Render instance has no persistent disk. Animal photos uploaded through
the Filament panel are written to `storage/app/public` and **disappear on
restart/redeploy**. The sample photos shipped in the repo (`storage/app/public/animals`
and `public/images/animals`) are baked into the image and always work.

To keep real uploads, use free S3-compatible storage — Cloudflare **R2** (10 GB free)
or Backblaze **B2**. Then set on Render:

```
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=auto
AWS_BUCKET=refuconnect
AWS_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com
AWS_USE_PATH_STYLE_ENDPOINT=true
```

### PayPal
Donations currently run in **sandbox** mode with no credentials. To accept real
donations, create a live PayPal app and set `PAYPAL_MODE=live`,
`PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`.

### Email
`MAIL_MAILER=log` means emails are only written to the log. For real mail, use a
free provider (Resend, Brevo) and set the matching `MAIL_*` variables.

### Route caching is disabled
`php artisan route:cache` cannot serialize the closure-based routes in
`routes/api.php` and `routes/web.php`, so the start script only caches config and
views. Convert those closures to controller methods if you want full route caching.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `500` on every API call | Check Render logs. Almost always a missing/incorrect `APP_KEY` or DB env var. |
| Frontend shows CORS error | Add the exact frontend origin (scheme + host, no trailing slash) to `CORS_ALLOWED_ORIGINS` and redeploy. |
| Animal photos broken | Ensure `APP_URL` is the Render URL (used for image URLs) and the frontend's `VITE_API_ORIGIN` matches. |
| Admin panel unstyled | The image build failed at the Node `npm run build` stage — check the Render build log. |
| `migrate` fails at boot | Verify `DB_SSLMODE=require` and that Neon allows connections from Render (Neon allows all IPs by default). |
| First request very slow | Normal on Render's free plan (cold start after sleep). |
| Frontend deep link → 404 | Confirm `frontend/vercel.json` is present and Root Directory is `frontend`. |

---

## Alternative hosts

- **Railway** — easiest PHP deploy (Nixpacks), but the free tier is only ~$5 of trial credits.
- **Fly.io** — good free allowance, but requires a card.
- **Cloudflare Pages** — drop-in alternative to Vercel for the frontend; the
  included `frontend/public/_redirects` handles SPA deep links.
- **Oracle Cloud Always Free** — an always-free ARM VM; most work to set up, most powerful.
