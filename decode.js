import fs from "fs";
import { readBitmapFile } from "@ericandrewlewis/bitmap";
import { decToByte, getBinString } from "./utils/handleBinaries.js";
import { DELIMITER } from "./utils/delimitMessage.js";
import { decode } from "./utils/handleArgs.js";

const image = decode()
const data = await readBitmapFile(image);
const imageData = [...data.imageData];
let hiddenMessage = "";
let isDelimited = "";

// retourne une CdC binaire du délimiteur
const binDelimiter = getBinString(DELIMITER);

// récupère les premiers élements dans l'image à taille du binDelimiter
// et crée une var. isDelimited pour vérifier si le délimiteur se trouve
// au début des données de l'image
for (let i = 0; i < binDelimiter.length; i++) {
  isDelimited += decToByte(imageData[i])[7];
}

// vérifie si un délimiteur se trouve au début de l'image
if (isDelimited !== binDelimiter) {
  //gestion erreur
  throw("ERROR: Picture is not encoded\n");
} else {
  let lastPixDigits = [];
  // on enlève le premier délimiteur de imageData
  imageData.splice(0, isDelimited.length);

  // on récupère tout les derniers chiffres (binaire) de chaque décimal de imageData
  for (const pix of imageData) {
    lastPixDigits.push(decToByte(pix)[7]);
  }

  // on structure lastPixDigits de manière à avoir uniquement des bytes dans le tableau
  for (let binary of lastPixDigits.join("").match(/.{1,8}/g)) {
    // tant que le message ne contient pas le délimiteur de fin,
    //  on continue de déchiffrer le message
    if (hiddenMessage.includes(DELIMITER)) {
      break;
    }
    // on converti le binaire en décimal puis on converti la décimale en charactère ASCII
    // puis on concatène ce char. avec hiddenMessage
    hiddenMessage += String.fromCharCode(parseInt(binary, 2));
  }
}

hiddenMessage = hiddenMessage.replace(DELIMITER, "")

console.log(
  "The hidden message is :",
  "\n",
  hiddenMessage
);

fs.writeFileSync("res/decoded-message.txt", hiddenMessage);

