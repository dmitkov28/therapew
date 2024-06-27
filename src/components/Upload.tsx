import image from "@/assets/therapew.svg";
import {
  generateDOCXFile,
  generateDocumentURL,
  convertWithFFmpeg,
} from "@/lib/transcripts";
import { useFFMPEG } from "@/lib/hooks";
import { supabase } from "@/supabase";
import { DownloadIcon, RotateCcw, UploadIcon } from "lucide-react";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.currentTarget.files?.length) {
      const uploadedFile = e.currentTarget.files[0];
      if (uploadedFile?.type.includes("audio")) {
        // This is needed because Whisper API has issues with some audio formats
        const convertedFile = await convertWithFFmpeg(ffmpeg, uploadedFile);
        setFile(convertedFile);
      } else {
        setError("Невалиден файл.");
      }
    }
  };

  const handleGenerateTranscript = async () => {
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await supabase.functions.invoke("generateTranscript", {
          body: formData,
        });

        const docxBlob = await generateDOCXFile(JSON.parse(data).text);
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

  const { ffmpeg, loaded: ffmpegLoaded } = useFFMPEG();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {ffmpegLoaded ? (
        <>
          {loading ? (
            <Loading msg="Генерирам транскрипция..." />
          ) : (
            <>
              {file && file.name && !error && <span>{file.name}</span>}
              <span className="text-red-500">{error}</span>
              {!loading && !transcript && (
                <label
                  htmlFor="file"
                  className="border w-full md:w-1/4 text-center text-slate-500 border-slate-400 p-8 rounded-md cursor-pointer hover:shadow-md flex justify-center items-center flex-col gap-3"
                >
                  <input
                    onChange={onFileUpload}
                    id="file"
                    // accept="audio/*"
                    type="file"
                    hidden
                  />
                  <UploadIcon width={20} />
                  <span>Качи файл</span>
                  <span className="text-sm italic">
                    Максимален размер: 25MB
                  </span>
                </label>
              )}

              {file && (
                <button
                  onClick={handleGenerateTranscript}
                  className="bg-emerald-600 w-full md:w-fit text-white md:px-2 md:py-1 py-2 rounded-md font-medium"
                >
                  Генерирай транскрипция
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
        </>
      ) : (
        <Loading msg="Подготвям системата..." />
      )}
    </div>
  );
}

const Loading = ({ msg }: { msg: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img className={`h-10 animate-bounce`} src={image} alt="" />
      <p className="text-emerald-600">{msg}</p>
    </div>
  );
};
