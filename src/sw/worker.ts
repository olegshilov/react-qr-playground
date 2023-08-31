import QRCodeReader from "@zxing/library/esm/core/qrcode/QRCodeReader";
import BinaryBitmap from "@zxing/library/esm/core/BinaryBitmap";
import HybridBinarizer from "@zxing/library/esm/core/common/HybridBinarizer";
import { ImageDataLuminanceSource } from "./ImageDataLuminanceSource";

export function parseQRCode(imageData: ImageData) {
  try {
    return new QRCodeReader()
      .decode(
        new BinaryBitmap(
          new HybridBinarizer(new ImageDataLuminanceSource(imageData))
        )
      )
      .getText();
  } catch (e) {
    return null;
  }
}
