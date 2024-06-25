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
