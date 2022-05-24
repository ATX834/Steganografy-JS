import fs from "fs";
import { readBitmapFile } from "@ericandrewlewis/bitmap";
import { decToByte, getBinString } from "./utils/handleBinaries.js";
import { encode } from "./utils/handleArgs.js";
import { getDelimitedMessage } from "./utils/delimitMessage.js";

let {hiddenMessage, image} = encode()
hiddenMessage = getDelimitedMessage(hiddenMessage)

const data = await readBitmapFile(image);

const {
  fileHeader: { imageDataOffset },
  imageData,
  colorTable,
} = data;

const header = [...fs.readFileSync("entry.bmp")].splice(0, imageDataOffset);

const binMsg = getBinString(hiddenMessage);

for (let i = 0; i < binMsg.length; i++) {
  let pixCode = imageData[i];
  let pixLastBit = decToByte(pixCode)[7];

  if (pixLastBit !== binMsg[i]) {
    pixCode >= 255 ? pixCode-- : pixCode++;
  }

  imageData[i] = pixCode;
}

const newImage = Buffer.from(header.concat([...imageData], [...colorTable]));

fs.writeFileSync("res/encodedImg.bmp", newImage);
