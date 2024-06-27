import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const chunkFile = () => {
  // chunk file into smaller chunks if its over 25mb
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

export const convertWithFFmpeg = async (ffmpeg: FFmpeg, file: File) => {
  await ffmpeg.writeFile(file.name, await fetchFile(file));
  await ffmpeg.readFile(file.name);
  await ffmpeg.exec(["-i", file.name, "-c:a", "copy", "output.m4a"]);
  const data = await ffmpeg.readFile("output.m4a");
  const blob = new Blob([data], { type: file.type });

  const outFile = new File([blob], file.name, { type: file.type });
  return outFile;
};
