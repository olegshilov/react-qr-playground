import { PropsWithChildren, useState } from "react";
import { QRCodeScan } from "./qr-code-scan";
import { QRCodeGenerate } from "./qr-code-generate";
import clsx from "clsx";

function QRScan() {
  const [scanResult, setScanResult] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-clash text-[16px] font-[500] leading-[1.2em] sm:text-[18px] lg:text-[22px]">
        QR Scan
      </h3>
      <QRCodeScan onResult={setScanResult} />
      <div>Result: {scanResult ? scanResult : "not detected"}</div>
    </div>
  );
}

const levelOptions = [
  { value: "L", label: "Low, 7%" },
  { value: "M", label: "Medium, 15%" },
  { value: "Q", label: "Quarter, 25%" },
  { value: "H", label: "High, 30%" },
];

function QRGenerate() {
  const [qrCodeData, setQrCodeData] = useState(
    "0x664B07EA8969d643B0aCc4829c113F6C20514F65"
  );
  const [qrCodeSize, setQrCodeSize] = useState(256);
  const [qrCodeLevel, setQrCodeLevel] = useState("Q");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-clash text-[16px] font-[500] leading-[1.2em] sm:text-[18px] lg:text-[22px]">
        QR Generate
      </h3>
      <div>
        <div className="flex flex-col gap-[8px]">
          <div>
            <input
              className={clsx(
                "inline-block w-full rounded-[6px] border border-[#252528] bg-transparent px-[16px] py-[12px] text-[14px] leading-[22px] text-white placeholder-white/25 outline-none",
                "transition-colors duration-150 ease-in will-change-[color,background]",
                "focus:border-white/50 focus:bg-transparent focus:text-white",
                "hover:border-white/20",
                "max-w-xl"
              )}
              type="text"
              placeholder="Data string"
              required
              id="qr-data"
              name="grantee"
              value={qrCodeData}
              onChange={(event) => {
                setQrCodeData(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <input
              className={clsx(
                "inline-block w-full rounded-[6px] border border-[#252528] bg-transparent px-[16px] py-[12px] text-[14px] leading-[22px] text-white placeholder-white/25 outline-none",
                "transition-colors duration-150 ease-in will-change-[color,background]",
                "focus:border-white/50 focus:bg-transparent focus:text-white",
                "hover:border-white/20",
                "max-w-xl"
              )}
              type="text"
              placeholder="QR Size"
              required
              id="qr-size"
              name="qr-size"
              value={qrCodeSize}
              onChange={(event) => {
                setQrCodeSize(Number.parseInt(event.currentTarget.value, 10));
              }}
            />
          </div>
          <div>
            <select
              id="level"
              className={clsx(
                "inline-block w-full rounded-[6px] border border-[#252528] bg-transparent px-[16px] py-[12px] text-[14px] leading-[22px] text-white placeholder-white/25 outline-none",
                "transition-colors duration-150 ease-in will-change-[color,background]",
                "focus:border-white/50 focus:bg-transparent focus:text-white",
                "hover:border-white/20 appearance-none cursor-pointer",
                "max-w-xl"
              )}
              value={qrCodeLevel}
              onChange={(event) => {
                setQrCodeLevel(event.currentTarget.value);
              }}
            >
              {levelOptions.map((level) => {
                return (
                  <option
                    key={`level-select-${level.value}`}
                    value={level.value}
                    selected={level.value === qrCodeLevel}
                  >
                    {level.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <QRCodeGenerate data={qrCodeData} size={qrCodeSize} level={qrCodeLevel} />
    </div>
  );
}

export function App() {
  return (
    <main>
      <Header />

      <section>
        <div className="py-[32px] lg:py-[68px]">
          <Container>
            <div className="font-clash text-[28px] uppercase leading-none sm:text-[48px] lg:text-[70px]">
              QR Playground
            </div>
          </Container>
        </div>
        <Container>
          <div className="grid grid-cols-2 gap-12">
            <QRScan />
            <QRGenerate />
          </div>
        </Container>
      </section>
    </main>
  );
}

function Header() {
  return (
    <div className="flex-0 sticky top-0 z-50">
      <header className="z-50 h-[62px] w-full transform-gpu border-y border-[#464647] sm:h-[72px] bg-[#0D0D0E]">
        <div className="mx-auto flex h-full w-full flex-row items-center pr-[16px] sm:pr-[64px] lg:pr-[80px]">
          <div className="flex h-full w-[48px] items-center justify-center border-r border-[#464647] sm:w-[64px] lg:w-[80px]">
            <div className="relative h-[26px] w-[26px] sm:h-[32px] sm:w-[32px]">
              <a aria-current="page" className="active" href="/">
                <img
                  src="https://staking.haqq.network/logo.c0bf55fcb1a3931cbacdd972bc9b3c81.svg"
                  alt="HAQQ"
                />
              </a>
            </div>
          </div>
          <div className="ml-[20px] font-clash text-[24px] font-medium leading-none lg:ml-[32px]">
            <a aria-current="page" className="active" href="/">
              HAQQ
            </a>
          </div>
          <div className="flex-1"></div>
        </div>
      </header>
    </div>
  );
}

function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full px-[16px] sm:px-[48px] lg:px-[79px]">
      {children}
    </div>
  );
}
