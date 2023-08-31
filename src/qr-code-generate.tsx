import { QRCodeSVG } from "qrcode.react";

export function QRCodeGenerate({
  data,
  size,
  level,
}: {
  data: string;
  size: number;
  level: string;
}) {
  console.log("QRCodeGenerate", { data });
  return (
    <div className="relative aspect-square w-fit">
      <QRCodeSVG
        value={data}
        size={size}
        bgColor="#ffffff"
        fgColor="#0D0D0E"
        level={level}
        includeMargin={true}
        markerEnd="round"
        markerHeight={100}
      />
    </div>
  );
}
