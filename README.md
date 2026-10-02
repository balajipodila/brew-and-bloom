# Brew & Bloom

A responsive specialty café landing page built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and Express.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite serves the website and proxies `/api` requests to the Express server on port 3001. Both processes run together and stop together.

## AI barista

The chat widget and four-question brew quiz work without credentials using a streamed, menu-aware local response. To use an OpenAI-compatible Chat Completions API, copy `.env.example` to `.env` and set:

```env
AI_API_KEY=your-server-side-key
AI_MODEL=gpt-4o-mini
AI_API_URL=https://api.openai.com/v1/chat/completions
API_PORT=3001
```

The key is read only by the Express server and is never included in the browser bundle. `AI_API_URL` may point to another compatible endpoint. The API limits each IP to 20 requests per minute and validates conversation length and message size.

## Production build

```bash
npm run build
npm run preview
```

Run the API server in production with `npx tsx server/index.ts` alongside the static `dist` host, and configure that host to proxy `/api` to the server. The reservation and newsletter forms currently provide client-side confirmation; connect them to a booking or mailing-list provider before using them to accept real bookings/subscriptions.

## Project structure

```text
server/       Express API and streamed barista responses
src/
  components/ Shared navigation, buttons, chat, and menu card
  data/       Menu catalog used by the page and AI context
  hooks/      Theme preference
  lib/        Streaming API client
  sections/   Landing page sections and visitor flows
public/       Favicon and static assets
```