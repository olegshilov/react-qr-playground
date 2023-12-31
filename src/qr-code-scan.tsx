import { useEffect } from "react";
import { useQrCode } from "./hooks/use-qr-code";

const width = 1920;
const height = 1080;

export function QRCodeScan({
  onResult,
}: {
  onResult: (result: string) => void;
}) {
  const { ref, result } = useQrCode({
    captureLastFrame: false,
    videoConstrains: {
      width,
      height,
    },
  });

  useEffect(() => {
    if (result) {
      onResult(result);
    }
  }, [onResult, result]);

  return (
    <div className="relative aspect-video w-fit">
      <video
        ref={ref}
        autoPlay
        width={width}
        height={height}
        className="object-cover w-full h-full relative z-0"
      />

      {/* {lastFrame.current && isStopped && (
        <img
          src={lastFrame.current}
          className="absolute inset-0 object-cover w-full h-full z-10"
        />
      )} */}
    </div>
  );
}
