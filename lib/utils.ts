export const generateId = () => {
  return crypto.randomUUID();
};

export const makeUrlFromString = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, "-");
};
