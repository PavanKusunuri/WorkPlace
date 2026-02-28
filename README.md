# WorkPlace

> A full-stack professional social network for developers. Built with the MERN stack, featuring a dual-auth system, social graph, privacy controls, and an organisation + job board platform.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Key Design Decisions](#key-design-decisions)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Skills Demonstrated](#skills-demonstrated)
- [Author](#author)

---

## Overview

WorkPlace is a production-grade social network for developers. Users build rich profiles, follow colleagues, write posts, join organisations, and apply for jobs — all in one platform.

The project extends a base MERN scaffold with original features: a **dual JWT authentication system** (users and organisations as separate actors), a **social graph with privacy controls**, and a **full job-board workflow** — backed by a custom Apple-inspired dark UI built entirely with Tailwind CSS.

---

## Features

### User Authentication and Profiles

- Register and login with JWT — token stored in localStorage, injected via Axios interceptor on every request
- Automatic session logout on token expiration via a 401 response interceptor in api.js
- Gravatar-based avatar generation via email hash
- Full profile CRUD: status, skills, bio, company, website, location, GitHub username
- Social links (Twitter, LinkedIn, Facebook, YouTube, Instagram) with URL normalisation
- GitHub latest repositories fetched live via the GitHub API

### Social Graph — Follow System

- Follow / Unfollow any developer (public profiles — instant)
- **Follow Requests** for private profiles (like Instagram): the target user must accept before content is visible
- Cancel outgoing follow requests
- Accept or Reject incoming follow requests from the Dashboard
- Follower and following counts shown on every profile card

### Profile Privacy

- **Public** — visible to all authenticated users
- **Private** — experience, education, GitHub repos, and posts locked behind a wall; only accepted followers can view content
- Toggle Public / Private from the Edit Profile form with an animated toggle switch
- Posts feed filters out content from private accounts server-side using MongoDB $nin
- Privacy is enforced at the API layer — not client-side only

### Organisation System (Dual Auth)

- Organisations register and log in with a **separate JWT** (x-org-token) — fully isolated from user auth
- Organisation dashboard: post, edit, and delete jobs; view all applications per role
- Navbar adapts dynamically to three states: Guest | Developer | Organisation

### Jobs Board

- Organisations post jobs: title, description, location, salary, type (Full-time / Part-time / Contract), and required skills
- Developers browse and filter the jobs listing
- One-click apply with a cover letter
- Developers track all their applications from their dashboard
- Organisations update application status: Pending > Reviewed > Accepted / Rejected

### Posts and Community Feed

- Create, like, and delete posts
- Nested comment threads on every post
- Feed respects privacy — posts from private accounts hidden server-side unless the viewer follows them

### Apple-Inspired Dark UI

- Custom design system built with **Tailwind CSS v3** — zero external component libraries
- Glassmorphism cards using a .glass utility class (backdrop-blur + translucent background)
- Gradient text, glowing ambient gradient orbs, and animated hero sections
- CSS keyframe animations: fadeIn, slideUp, float, pulseGlow, shimmer
- Frosted-glass Navbar with three-state link sets (Guest / Developer / Organisation)
- Fully responsive layout

---

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** + **Express.js** | REST API server |
| **MongoDB Atlas** + **Mongoose** | Cloud database + ODM |
| **JSON Web Tokens** | Stateless auth — dual token system |
| **bcryptjs** | Password hashing |
| **express-validator** | Request body validation |
| **axios** | Server-side HTTP calls (GitHub API) |
| **normalize-url** | URL sanitisation |
| **gravatar** | Avatar generation |
| **config** | Environment config management |
| **nodemon** | Dev hot-reload |

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Redux** + **Redux Thunk** | Global state management + async actions |
| **React Router v6** | Client-side routing |
| **Tailwind CSS v3** | Utility-first styling |
| **Axios** | HTTP client with request/response interceptors |
| **PostCSS** | CSS processing pipeline |
| **concurrently** | Run server + client in one command |

---

## Architecture

```
WorkPlace/
├── server.js                 Entry point — mounts all API routes
├── config/
│   ├── db.js                 Mongoose connection
│   └── default.json          Secrets (gitignored)
├── middleware/
│   ├── auth.js               User JWT middleware
│   ├── orgAuth.js            Organisation JWT middleware
│   └── checkObjectId.js      ObjectId validation
├── models/
│   ├── User.js               followers[], following[], followRequests[]
│   ├── Profile.js            isPrivate, experience[], education[], social{}
│   ├── Post.js               likes[], comments[]
│   ├── Organization.js       Org accounts (separate auth)
│   ├── Job.js                Job listings
│   └── Application.js        Applications with status workflow
├── routes/api/
│   ├── users.js              Register, load user
│   ├── auth.js               Login
│   ├── profile.js            Profile CRUD + follow/request/accept/reject
│   ├── posts.js              Posts CRUD + likes + comments (privacy-gated)
│   ├── organizations.js      Org register/login/dashboard
│   └── jobs.js               Jobs CRUD + applications
└── client/src/
    ├── actions/              Redux action creators (auth, profile, post, org, job)
    ├── reducers/             Redux reducers — 6 slices
    ├── components/
    │   ├── auth/             Login, Register
    │   ├── dashboard/        Dashboard + follow requests panel
    │   ├── layout/           Navbar (3-state), Alert, Landing, Spinner
    │   ├── profile/          Profile view with privacy wall + 4-state follow button
    │   ├── profile-forms/    ProfileForm with animated privacy toggle
    │   ├── profiles/         Developer directory
    │   ├── posts/            Feed + create post
    │   ├── post/             Single post + comments
    │   ├── org/              Org dashboard, post job, applications
    │   ├── jobs/             Job listing, detail, apply
    │   └── routing/          PrivateRoute, OrgPrivateRoute
    └── utils/
        ├── api.js            Axios instance — dual 401 interceptor
        ├── setAuthToken.js   User token into headers
        └── setOrgAuthToken.js  Org token into headers
```

---

## Key Design Decisions

**Dual JWT System**

User auth and Organisation auth are completely separate actors. Each has its own token header (x-auth-token vs x-org-token), its own Express middleware, its own Redux slice, and its own Navbar link set. The Axios 401 interceptor inspects the request URL to dispatch the correct logout action — preventing one actor from killing the other's session.

**Privacy Enforced at the API Layer**

Private profile filtering happens server-side, not in the client. The GET /api/posts endpoint fetches all private profiles, diffs against the requester's following[] array, then uses MongoDB's $nin operator to exclude blocked posts before the data is sent to the browser.

**Follow Request Workflow**

When a user follows a private profile, the server detects profile.isPrivate, adds the requester to targetUser.followRequests[] instead of followers[], and returns { requested: true }. The Redux action creator branches on this flag to dispatch either FOLLOW_USER or SEND_FOLLOW_REQUEST. The UI renders four distinct button states: Follow / Request Follow / Requested (Cancel) / Following.

**Redux State Shape**

The profile reducer stores followRequests[] as top-level state so the Dashboard renders incoming requests without a separate API call on mount — it dispatches getFollowRequests() alongside getCurrentProfile() in a single useEffect.

---

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas cluster URI
- GitHub personal access token (for the GitHub repos feature)

### 1 — Configuration

Create `config/default.json`:

```json
{
  "mongoURI": "<your_mongodb_atlas_uri>",
  "jwtSecret": "<any_long_random_string>",
  "githubToken": "<your_github_personal_access_token>"
}
```

### 2 — Install dependencies

```bash
npm install
cd client && npm install
```

### 3 — Run in development

```bash
npm run dev
```

Starts Express on port 5000 and React on port 3000 concurrently.

### 4 — Production build

```bash
cd client && npm run build
```

Then from root:

```bash
# Windows
$env:NODE_ENV="production"; node server.js

# Linux / macOS
NODE_ENV=production node server.js
```

---

## API Reference

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/auth | Load authenticated user | User JWT |
| POST | /api/auth | Login — returns JWT | Public |
| POST | /api/users | Register new user | Public |

### Profiles

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/profile | All profiles | Public |
| GET | /api/profile/me | Current user profile | User JWT |
| POST | /api/profile | Create / update profile | User JWT |
| DELETE | /api/profile | Delete account | User JWT |
| GET | /api/profile/user/:id | Profile by user ID | Public |
| PUT | /api/profile/experience | Add experience | User JWT |
| DELETE | /api/profile/experience/:id | Remove experience | User JWT |
| PUT | /api/profile/education | Add education | User JWT |
| DELETE | /api/profile/education/:id | Remove education | User JWT |
| GET | /api/profile/github/:username | GitHub repos | Public |
| PUT | /api/profile/follow/:id | Follow or send request | User JWT |
| PUT | /api/profile/unfollow/:id | Unfollow | User JWT |
| PUT | /api/profile/cancel-request/:id | Cancel follow request | User JWT |
| GET | /api/profile/follow-requests | Incoming requests | User JWT |
| PUT | /api/profile/accept-request/:id | Accept request | User JWT |
| PUT | /api/profile/reject-request/:id | Reject request | User JWT |
| GET | /api/profile/followers/:id | Followers list | User JWT |
| GET | /api/profile/following/:id | Following list | User JWT |

### Posts

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/posts | All posts (privacy-gated) | User JWT |
| POST | /api/posts | Create post | User JWT |
| GET | /api/posts/:id | Single post | User JWT |
| DELETE | /api/posts/:id | Delete post | User JWT |
| PUT | /api/posts/like/:id | Like | User JWT |
| PUT | /api/posts/unlike/:id | Unlike | User JWT |
| POST | /api/posts/comment/:id | Add comment | User JWT |
| DELETE | /api/posts/comment/:id/:comment_id | Remove comment | User JWT |

### Organisations and Jobs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | /api/organizations/register | Register org | Public |
| POST | /api/organizations/login | Org login | Public |
| GET | /api/organizations/me | Load org | Org JWT |
| GET | /api/jobs | All jobs | Public |
| POST | /api/jobs | Post a job | Org JWT |
| PUT | /api/jobs/:id | Update job | Org JWT |
| DELETE | /api/jobs/:id | Delete job | Org JWT |
| GET | /api/jobs/org/my-jobs | Org job listings | Org JWT |
| POST | /api/jobs/:id/apply | Apply | User JWT |
| GET | /api/jobs/my-applications | My applications | User JWT |
| GET | /api/jobs/org/applications | Org applications | Org JWT |
| PUT | /api/jobs/applications/:id/status | Update status | Org JWT |

---

## Skills Demonstrated

- **Full-Stack JavaScript** — Node.js/Express REST API consumed by a React 18 SPA with Redux
- **Database Design** — MongoDB schema modelling with embedded arrays (followers, followRequests, experience) and Mongoose population
- **State Management** — Redux + Thunk; normalised state shape across 6 slices: auth, profile, post, org, job, alert
- **Authentication** — Stateless JWT; bcrypt password hashing; dual-actor auth; protected routes on client and server
- **REST API Design** — Resource-oriented routes, correct HTTP semantics, middleware composition, input validation
- **UI Engineering** — Custom design system with Tailwind CSS; CSS animations; glassmorphism; zero external UI libraries
- **Async Patterns** — async/await throughout; Axios interceptors; error boundaries; loading states
- **Security** — Tokens never stored in Redux state; ObjectId validation middleware; URL sanitisation; per-route auth guards
- **Code Organisation** — Feature-based folder structure; separation of concerns across models, routes, middleware, Redux, and components

---

## Author

**Pavan**

---

## License

MIT