import soundWaveGif from "@/assets/soundWave.gif";
import { supabase } from "@/supabase";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "./Upload";
import { useFFMPEG } from "@/lib/hooks";
import { convertWithFFmpeg } from "@/lib/transcripts";

export default function AudioRecorder({
  setSessionInput,
  setRecordingMode,
}: {
  sessionInput: {
    date: Date;
    notes: string;
  };
  setSessionInput: React.Dispatch<
    React.SetStateAction<{
      date: Date;
      notes: string;
    }>
  >;
  setRecordingMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isTranscribing, setIsTranscribing] = useState(false);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream.active) {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      }
    })();
  }, []);

  const { ffmpeg, loaded: ffmpegLoaded } = useFFMPEG();

  const handleStartRecording = async () => {
    setIsRecording(true);

    if (mediaRecorder) {
      setIsRecording(true);
      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });
        const file = new File([audioBlob], "recording.m4a", {
          type: audioBlob.type,
        });

        const convertedFile = await convertWithFFmpeg(ffmpeg, file);

        // const audioUrl = URL.createObjectURL(audioBlob);

        const formData = new FormData();
        formData.append("file", convertedFile);

        setIsTranscribing(true);

        const { data } = await supabase.functions.invoke("generateTranscript", {
          body: formData,
        });
        const parsedData = JSON.parse(data);

        setSessionInput((prevData) => ({
          ...prevData,
          notes: parsedData.text,
        }));
        setIsRecording(false);
        setIsTranscribing(false);
        setRecordingMode(false);
      };

      mediaRecorder.start();
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 my-8 pb-8 items-center justify-center">
      {isRecording && <img src={soundWaveGif} />}
      {isRecording && !isTranscribing && (
        <StopCircleIcon
          onClick={handleStopRecording}
          className="text-red-500 cursor-pointer hover:text-red-600"
          size={50}
        />
      )}
      {!ffmpegLoaded && <Loading msg="Подготвям системата.." />}

      {!isRecording && !isTranscribing && (
        <PlayCircleIcon
          onClick={handleStartRecording}
          className="text-emerald-600 cursor-pointer hover:text-emerald-800"
          size={50}
        />
      )}
      {!isRecording && isTranscribing && (
        <Loading msg="Генерирам транскрипция..." />
      )}
    </div>
  );
}
