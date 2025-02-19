const jwt = require("jsonwebtoken");
console.log("JWT_KEY from env:", process.env.JWT_KEY);
const key = process.env.JWT_KEY || "my_private_secret";


const generateAuthToken = ({ _id, isAdmin, isBusiness }) =>
  jwt.sign({ _id, isAdmin, isBusiness }, key, { expiresIn: "1h" });

const verifyToken = (tokenFromClient) => {
  if (!tokenFromClient) return null;
  try {
    return jwt.verify(tokenFromClient, key);
  } catch {
    return null;
  }
};

module.exports = { generateAuthToken, verifyToken };
