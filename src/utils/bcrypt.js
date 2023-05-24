import bcryptjs from "bcryptjs";

export const bcrypt = (word) => {
  const hash = bcryptjs.hashSync(word, 10);
  return hash;
};
