import image from "@/assets/therapew.svg";
import {
  generateDOCXFile,
  generateDocumentURL,
  generateTranscript,
} from "@/lib/ai";
import { UploadIcon, DownloadIcon, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) setFile(e.currentTarget.files[0]);
  };

  const handleGenerateTranscript = async () => {
    setLoading(true);
    try {
      if (file) {
        const text = await generateTranscript(file);
        const docxBlob = await generateDOCXFile(text as unknown as string);
        const blobUrl = generateDocumentURL(docxBlob);
        setTranscript(blobUrl);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          {file && file.name}
          {!loading && !transcript && (
            <label
              htmlFor="file"
              className="border w-full md:w-1/4 text-slate-500 border-slate-400 p-8 rounded-md cursor-pointer hover:shadow-md flex justify-center items-center flex-col gap-3"
            >
              <input
                onChange={onFileUpload}
                id="file"
                accept="audio/*"
                type="file"
                hidden
              />
              <UploadIcon width={20} /> Качи файл
            </label>
          )}

          {file && (
            <button
              onClick={handleGenerateTranscript}
              className="bg-emerald-600 w-full md:w-fit text-white md:px-2 md:py-1 py-2 rounded-md font-medium"
            >
              Създай транскрипция
            </button>
          )}

          {transcript && !loading && !file && (
            <div className="flex flex-col w-full justify-center items-center gap-16">
              <a
                className="flex justify-center items-center gap-2 bg-emerald-600 w-full text-center md:w-fit text-white md:px-4 md:py-3 py-2 rounded-md font-medium"
                href={transcript}
                download={`${new Date().toDateString()}.docx`}
              >
                <DownloadIcon /> Изтегли файл
              </a>
              <button
                onClick={() => {
                  setTranscript("");
                }}
                className="flex justify-center items-center gap-2 rounded-md border border-emerald-600 text-emerald-600  w-full text-center md:w-fit  md:px-4 md:py-3 py-2 font-medium"
              >
                <RotateCcw /> Нова транскрипция
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img className={`h-10 animate-bounce`} src={image} alt="" />
      <p className="text-emerald-600">Генерирам транскрипция...</p>
    </div>
  );
};