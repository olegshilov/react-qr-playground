import InvertedLuminanceSource from "@zxing/library/esm/core/InvertedLuminanceSource";
import LuminanceSource from "@zxing/library/esm/core/LuminanceSource";
import IllegalArgumentException from "@zxing/library/esm/core/IllegalArgumentException";

export class ImageDataLuminanceSource extends LuminanceSource {
  private buffer: Uint8ClampedArray;

  constructor(data: ImageData) {
    super(data.width, data.height);
    this.buffer = ImageDataLuminanceSource.toGrayscaleBuffer(
      data.data,
      data.width,
      data.height
    );
  }
  static toGrayscaleBuffer(
    imageBuffer: Uint8ClampedArray,
    width: number,
    height: number
  ) {
    const grayscaleBuffer = new Uint8ClampedArray(width * height);

    for (
      let i = 0, j = 0, length = imageBuffer.length;
      i < length;
      i += 4, j++
    ) {
      let gray;
      const alpha = imageBuffer[i + 3];

      if (alpha === 0) {
        gray = 0xff;
      } else {
        const pixelR = imageBuffer[i];
        const pixelG = imageBuffer[i + 1];
        const pixelB = imageBuffer[i + 2];
        gray = (306 * pixelR + 601 * pixelG + 117 * pixelB + 0x200) >> 10;
      }

      grayscaleBuffer[j] = gray;
    }

    return grayscaleBuffer;
  }

  getRow(y: number, row: Uint8ClampedArray) {
    if (y < 0 || y >= this.getHeight()) {
      throw new IllegalArgumentException(
        "Requested row is outside the image: " + y
      );
    }
    const width = this.getWidth();
    const start = y * width;

    if (row === null) {
      row = this.buffer.slice(start, start + width);
    } else {
      if (row.length < width) {
        row = new Uint8ClampedArray(width);
      }
      row.set(this.buffer.slice(start, start + width));
    }
    return row;
  }

  getMatrix() {
    return this.buffer;
  }

  isCropSupported() {
    return false;
  }

  crop() {
    return this;
  }

  isRotateSupported() {
    return false;
  }

  rotateCounterClockwise() {
    return this;
  }

  rotateCounterClockwise45() {
    return this;
  }

  invert() {
    return new InvertedLuminanceSource(this);
  }
}
