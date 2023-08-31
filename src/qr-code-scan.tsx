import { useEffect } from "react";
import { useQrCode } from "./hooks/use-qr-code";

const width = 1920;
const height = 1080;

export function QRCodeScan({
  onResult,
}: {
  onResult: (result: string) => void;
}) {
  const { ref, result, isStopped, lastFrame, stop } = useQrCode({
    captureLastFrame: true,
    videoConstrains: {
      width,
      height,
    },
  });

  useEffect(() => {
    if (result) {
      onResult(result);
      stop();
    }
  }, [onResult, result]);

  return (
    <div className="relative md:aspect-video aspect-[9/16] md:w-fit w-full h-full md:h-auto">
      <video
        ref={ref}
        autoPlay
        width={width}
        height={height}
        className="object-cover w-full h-full relative z-0"
      />

      {lastFrame.current && isStopped && (
        <img
          src={lastFrame.current}
          className="absolute inset-0 object-cover w-full h-full z-10"
        />
      )}
    </div>
  );
}
