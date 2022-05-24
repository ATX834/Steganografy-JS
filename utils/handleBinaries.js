export const decToByte = (dec) => {
  dec = dec.toString(2);
  return "00000000".substr(dec.length) + dec;
};

export const getBinString = (string) => {
  let binString = [];

  for (const char of string) {
    const charCode = char.charCodeAt(0);
    binString.push(decToByte(charCode));
  }

  return binString.join("");
};
