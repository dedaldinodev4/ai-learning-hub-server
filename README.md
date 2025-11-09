# AI Learning Hub - Backend

Powerful backend built with **Node**, **Drizzle**, and **MySQL**, providing REST APIs for authentication (manual and Google OAuth), AI-powered content generation, and topic management.

---

## 🚀 Tech Stack

- **Node** — Node.js is an open-source and cross-platform JavaScript runtime environment.
- **Fastify** - Fast and low overhead web framework, for Node.js
- **Drizzle** — Database ORM
- **MySQL** — Relational database
- **JWT Authentication** — Manual login with token
- **Google OAuth** — Social login via Google
- **OpenAI API** — AI content generation
- **Deployed on Railway**

---

## Environment Variables

Create a `.env` file in the root of the backend folder:

```bash
DATABASE_URL="your_database_url"
OPENAI_API_KEY=your_openai_key
JWT_SECRET=super_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://yourbackend.up.railway.app/auth/google/callback
PORT=3333
```
## Project Structure



