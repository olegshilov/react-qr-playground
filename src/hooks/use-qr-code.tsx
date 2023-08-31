import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useUserMedia } from "@vardius/react-user-media";
import { parseQRCodeInWorker } from "../utils";

export function useQrCode({
  videoConstrains,
  captureLastFrame,
}: {
  videoConstrains: MediaTrackConstraints;
  captureLastFrame?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const lastFrame = useRef<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isStopped, setStopped] = useState(false);
  const { stream, error } = useUserMedia({
    audio: false,
    video: {
      width: 300,
      height: 300,
      facingMode: "environment",
      aspectRatio: window.devicePixelRatio || 1,
      ...videoConstrains,
    },
  });

  const stop = useCallback(() => {
    const video = ref.current;

    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.stop();
      });
    }

    if (video) {
      // video.srcObject = null;
      setStopped(true);
    }
  }, [stream]);

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  useEffect(() => {
    const captureStream = stream;
    const video = ref.current;

    if (video && captureStream) {
      // video.src = "";
      video.srcObject = captureStream;
    }

    return () => {
      if (captureStream) {
        captureStream.getVideoTracks().forEach((stream) => {
          stream.stop();
        });
      }

      // if (video) {
      //   video.src = "";
      //   video.srcObject = null;
      // }
    };
  }, [ref, stream]);

  const memoizedResult = useMemo(() => {
    return result;
  }, [result]);

  useEffect(() => {
    setStopped(false);
    const video = ref.current;
    const height = +videoConstrains.height! || 300;
    const width = +videoConstrains.width! || 300;
    let assignedCanvas: OffscreenCanvas | null = null;

    const notify = async () => {
      if (assignedCanvas && video) {
        let context = assignedCanvas.getContext("2d", {
          alpha: false,
        });

        if (context) {
          context.drawImage(video, 0, 0);

          let imageData: ImageData | null = context.getImageData(
            0,
            0,
            width,
            height
          );

          if (imageData) {
            const res = await parseQRCodeInWorker(imageData);

            if (res !== memoizedResult && res) {
              setResult(res);
            }
          }

          if (captureLastFrame) {
            const canvasForLastFrame = document.createElement("canvas");
            canvasForLastFrame.width = imageData.width;
            canvasForLastFrame.height = imageData.height;
            const contextForLastFrame = canvasForLastFrame.getContext("2d");
            if (contextForLastFrame) {
              contextForLastFrame.drawImage(video, 0, 0);
              const lastFrameDataURL =
                canvasForLastFrame.toDataURL("image/jpeg");
              lastFrame.current = lastFrameDataURL;
            }
          }

          imageData = null;
          context = null;
        }
      }
    };

    if (video && width && height) {
      const cv = document.createElement("canvas");
      assignedCanvas = cv.transferControlToOffscreen();

      assignedCanvas.height = height;
      assignedCanvas.width = width;

      video.addEventListener("timeupdate", notify);
    } else if (Number.isNaN(width) || Number.isNaN(height)) {
      throw new TypeError("height and width must be numbers");
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", notify);
      }

      assignedCanvas = null;
      setStopped(true);
    };
  }, [
    ref,
    videoConstrains.height,
    videoConstrains.width,
    memoizedResult,
    captureLastFrame,
  ]);

  return useMemo(() => {
    return {
      ref,
      result: memoizedResult,
      error,
      reset,
      stop,
      lastFrame,
      isStopped,
    };
  }, [ref, memoizedResult, error, reset, stop, lastFrame, isStopped]);
}
