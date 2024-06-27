import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";

export const useDebounced = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
};

export const usePaginate = () => {
};

export const useFFMPEG = () => {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript",
      ),
    });
    setLoaded(true);
  };

  useEffect(() => {
    let isCancelled = false;
    const loadFFMPEG = async () => {
      if (!isCancelled) {
        await load();
      }
    };
    loadFFMPEG();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { ffmpeg: ffmpegRef.current, loaded };
};
