# Deployment Guide

## Frontend → Vercel (Free)

1. Push this repo to GitHub
2. Go to https://vercel.com → New Project → Import your repo
3. Set **Root Directory** to `frontend`
4. Add Environment Variable:
   - `REACT_APP_BACKEND_URL` = your backend URL (e.g. https://clearspace-api.railway.app)
5. Deploy → Vercel gives you a free `.vercel.app` URL

## Backend → Railway (Free tier)

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select your repo, set **Root Directory** to `backend`
3. Add Environment Variables:
   - `MONGO_URL` = your MongoDB connection string (use MongoDB Atlas free tier)
   - `DB_NAME` = clearspace
   - `CORS_ORIGINS` = https://your-vercel-app.vercel.app
   - `GOOGLE_SHEETS_WEBHOOK_URL` = (optional)
4. Add start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Railway gives you a free `.railway.app` URL

## MongoDB Atlas (Free)

1. https://cloud.mongodb.com → Create free M0 cluster
2. Create a database user and whitelist all IPs (0.0.0.0/0)
3. Copy the connection string → paste as `MONGO_URL` in Railway
