import fs from "fs";

const validArgs = process.argv.filter((arg) => arg.includes("="));
let hiddenMessage = "";

const getArgValue = (key) => {
  const value = validArgs[validArgs.findIndex((v) => v.includes(key))];
  if (value) {
    return value.split("=")[1];
  }
};

const message = getArgValue("msg");
const file = getArgValue("file");
const image = getArgValue("image");

export const encode = () => {
  if (!validArgs.length) {
    throw "ERROR: Missing arguments \n";
  }

  checkImageArg();

  checkMessageAndFileArgs();

  if (!hiddenMessage) throw "ERROR: No message to encode";

  return { hiddenMessage, image };
};

export const decode = () => {
  if (!validArgs.length) {
    throw "ERROR: Missing arguments \n";
  }

  checkImageArg(image);

  return image;
};
export const sniff = () => {
  if (!validArgs.length) {
    throw "ERROR: Missing arguments \n";
  }

  checkImageArg(image);

  return image;
};

const checkImageArg = () => {
  if (!image) {
    throw "ERROR: 'image' argument should be specified.\n";
  }

  if (image.split(".")[1] !== "bmp") {
    throw "ERROR: Image extension should be .bmp \n";
  }
};

const checkMessageAndFileArgs = () => {
  if (message && file) {
    throw "ERROR: Only one argument accepted (file or message) \n";
  }

  if (file && file.split(".")[1] !== "txt") {
    throw "ERROR: File extension should be .txt \n";
  }

  if (file) {
    hiddenMessage =
      file.split(".")[1] === "txt" && fs.readFileSync(file, "utf-8");
  }

  if (message) {
    hiddenMessage = message;
  }
};
