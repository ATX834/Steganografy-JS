import fs from "fs";
import { readBitmapFile } from "@ericandrewlewis/bitmap";
import { sniff } from "./utils/handleArgs.js";

const image = sniff();

const data = await readBitmapFile(image);

const {
  fileHeader: { imageDataOffset },
} = data;

const header = [...fs.readFileSync(image)].splice(
  0,
  imageDataOffset
);
const imageData = [...fs.readFileSync(image)].splice(imageDataOffset);

for (let i = 0; i < imageData.length; i++) {
  imageData[i] = imageData[i] % 2 === 0 ? 255 : 0;
}

const newImage = Buffer.from(header.concat([...imageData]));

fs.writeFileSync("res/sniffed.bmp", newImage);
