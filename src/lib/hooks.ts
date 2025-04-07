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
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";

    const urlPaths = [
        "ffmpeg-core.js",
        "ffmpeg-core.wasm",
        "ffmpeg-core.worker.js",
    ];

    const cacheName = "ffmpeg";
    const cachedUrls = urlPaths.map((path) => `${baseURL}/${path}`);

    useEffect(() => {
        (async () => {
            const cached = await readCache(
                cacheName,
                cachedUrls,
            );

            if (
                Array.isArray(cached) &&
                !cached.some((item) => item !== undefined)
            ) {
                await setCache(cacheName, cachedUrls);
            }
        })();
    }, []);

    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());

    const load = async () => {
        const ffmpeg = ffmpegRef.current;

        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await ffmpeg.load({
            coreURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.js`,
                "text/javascript",
            ),
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

const readCache = async (cacheName: string, cacheKey: string | string[]) => {
    const cache = await caches.open(cacheName);
    if (Array.isArray(cacheKey)) {
        const dataPromises = cacheKey.map(async (singleUrl) => {
            const data = await cache.match(singleUrl);
            return data;
        });
        return Promise.all(dataPromises);
    } else {
        const data = await cache.match(cacheKey);
        return data;
    }
};

const setCache = async (cacheName: string, data: any) => {
    const cache = await caches.open(cacheName);
    try {
        if (Array.isArray(data)) {
            await cache.addAll(data);
        } else {
            await cache.add(data);
        }
    } catch (e) {
        console.error(e);
    }
};
