const qrWorkerInstance = new ComlinkWorker<typeof import("./sw/worker")>(
  new URL("./sw/worker", import.meta.url)
);

const parseQRCodeInWorker = qrWorkerInstance.parseQRCode;

export { parseQRCodeInWorker };
