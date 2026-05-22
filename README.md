# TaskFlow — Team Task Manager

> A futuristic, full-stack team task management platform with role-based access control, Kanban boards, and real-time project tracking.

🔴 **Live Demo**: [team-task-manager-liart-mu.vercel.app](https://team-task-manager-liart-mu.vercel.app)

🟢 **Backend API**: [team-task-manager-production-c170.up.railway.app](https://team-task-manager-production-c170.up.railway.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + React Router v6 |
| **Styling** | Vanilla CSS (dark glassmorphism theme) |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Auth** | JWT (JSON Web Tokens, 30-day expiry) |
| **Deployment** | Vercel (frontend) + Railway (backend) |

---

## Features

- ✅ **Authentication** — Signup/Login with JWT, persistent sessions
- ✅ **Role-Based Access** — Admin vs Member permissions
- ✅ **Project Management** — Create, view, delete projects with deadlines
- ✅ **Team Management** — Add members by email, assign roles
- ✅ **Task System** — Create, assign, update, delete tasks with priority + status
- ✅ **Kanban Board** — Per-project Todo / In Progress / Done columns
- ✅ **Dashboard** — Stats (total, in-progress, done, overdue) + recent tasks
- ✅ **Filter Tasks** — By status and project
- ✅ **Responsive** — Mobile-first design

---

## Quick Start

### Prerequisites
- Node.js ≥ 16
- MongoDB Atlas account (free tier)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/team-task-manager
PORT=5000
JWT_SECRET=your_super_secret_key_here_min_32_chars
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev    # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev    # Starts on http://localhost:5173
```

---

## Deployment

### Backend → Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
3. Select your repo → root directory: `backend`
4. Add Environment Variables in Railway dashboard:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   CLIENT_URL=https://your-vercel-app.vercel.app
   NODE_ENV=production
   PORT=5000
   ```
5. Railway auto-detects `railway.toml` and deploys
6. Copy the generated URL (e.g. `https://team-task-manager-backend.railway.app`)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import GitHub repo
2. Set **Root Directory**: `frontend`
3. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
4. Build command: `npm run build` | Output: `dist`
5. Deploy! ✅

---

## API Reference

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Get all projects | Yes |
| POST | `/api/projects` | Create project | Yes |
| GET | `/api/projects/:id` | Get project details | Yes |
| PUT | `/api/projects/:id` | Update project | Yes |
| DELETE | `/api/projects/:id` | Delete project | Admin |
| POST | `/api/projects/:id/members` | Add member by email | Yes |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get tasks (with filters) | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Creator/Admin |
| GET | `/api/tasks/dashboard` | Dashboard stats | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| PUT | `/api/users/:id/role` | Change user role | Admin |

---

## Folder Structure

```
team-task-manager/
├── backend/
│   ├── configs/         # DB configuration
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── index.js         # App entry point
│   ├── railway.toml     # Railway deployment config
│   └── package.json
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI (Sidebar, Navbar, TaskCard)
│   │   ├── context/     # AuthContext (JWT state)
│   │   ├── pages/       # Route pages (Dashboard, Projects, Tasks, Team)
│   │   └── utils/       # Axios client + helpers
│   ├── vercel.json      # Vercel SPA routing config
│   ├── railway.toml     # Railway deployment config (alternative)
│   └── package.json
└── README.md
```

---

## Demo Video

[Watch 2-min Demo](YOUR_VIDEO_LINK_HERE)

---

## License

MIT
