import OpenAI from "openai";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const chunkFile = () => {
  // chunk file into smaller chunks if its over 25mb
};

export const generateTranscript = async (file: File) => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    response_format: "text",
  });

  return transcription;
};

export const generateDocumentURL = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateDOCXFile = async (text: string) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(text)],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};
