import bcryptjs from "bcryptjs";

export const bcrypt = (word) => {
  const hash = bcryptjs.hashSync(word, 10);
  return hash;
};

// export const decryptPassword = (encryptedPassword) => {
//   const decrypted = bcryptjs.compareSync(password, encryptedPassword);
//   return decrypted;
// };

