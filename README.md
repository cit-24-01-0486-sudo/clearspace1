# ClearSpace 🌿

Community-powered waste reporting platform. Report waste hotspots, alert authorities, and track resolution.

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, React Router, Axios, Lucide Icons, Sonner
- **Backend**: FastAPI, MongoDB (Motor), Python 3.11+

## Project Structure

```
clearspace/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/sections/   # Page sections
│   │   ├── components/ui/         # UI primitives
│   │   ├── pages/                 # Route pages
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── backend/           # FastAPI server
    ├── server.py
    └── requirements.txt
```

## Local Development

### Frontend
```bash
cd frontend
cp .env.example .env        # set REACT_APP_BACKEND_URL
npm install
npm start                   # runs on http://localhost:3000
```

### Backend
```bash
cd backend
cp .env.example .env        # set MONGO_URL, DB_NAME, etc.
pip install -r requirements.txt
uvicorn server:app --reload  # runs on http://localhost:8000
```

## Deployment

- **Frontend**: Vercel (recommended) — connect repo, set `REACT_APP_BACKEND_URL` env var
- **Backend**: Railway or Render — connect repo `/backend` folder, set env vars

See DEPLOYMENT.md for step-by-step instructions.
