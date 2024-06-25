import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const generateTranscript = async (file: File) => {
  const openai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY"),
  });
  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    response_format: "text",
  });

  return transcription;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { ...corsHeaders },
    });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const transcript = await generateTranscript(file);

  const data = { text: transcript };

  return new Response(
    JSON.stringify(data),
    {
      headers: {
        ...corsHeaders,
      },
    },
  );
});
