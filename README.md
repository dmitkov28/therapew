## Therapew

A simple app for therapists to keep track of their clients and sessions.

Built with React & Supabase

To run it:

1. Set up your supabase credentials as environment variables:
   ```
   VITE_SUPABASE_URL= your supabase url
   VITE_SUPABASE_ANON_KEY= your supabase anon key
   ```
2. Build the image and run as a Docker container:

    ```bash
    docker -build -t therapew .
    docker run -d -p 80:80
    ```

   