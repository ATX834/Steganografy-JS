export const DELIMITER = "||";

export const getDelimitedMessage = (message) => {
  return DELIMITER + message + DELIMITER;
};
