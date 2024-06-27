## Therapew

A simple app for therapists to keep track of their clients and sessions.

### Features
- Client records database
- Notes on therapy sessions
- Full-text search of clients
- Audio transcriptions (via OpenAI's Whisper API)

### Requirements
- Node
- Docker (optional)
- Supabase CLI (optional)
- OpenAI API Key (optional, required for the transcriptions feature)

### Installation

You can run Therapew as a Node process or inside a Docker container (recommended).

Regardless of which option you choose, first, make sure all environment variables are set and you have a Supabase project running.

   ```
   VITE_SUPABASE_URL= your supabase url
   VITE_SUPABASE_ANON_KEY= your supabase anon key
   ```

Link your Supabase project:
```
npx supabase link --project-ref YOUR_PROJECT_ID
```

The transcripts generator requires an OpenAI API key, which you need to set as a Supabase secret:

```
npx supabase secrets set YOUR_OPENAI_API_KEY
```

Deploy the Edge Function:
```
npx supabase functions deploy
```

Push the db migration to set up the db schema **(required)**:
```
npx supabase db push
```


**Option 1 (Node):**

```
npm run build
npm run start
```

The app should be accessible at [http://localhost:4173](http://localhost:4173)

**Option 2 (Docker):**

```
docker build -t therapew .
docker run -d -p 80:80
```

The app should be accessible at http://localhost:80

   