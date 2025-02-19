const config = require("config");
const { verifyToken } = require("./providers/jwt");
const { handleError } = require("../utils/errorHandler");

const auth = (req, res, next) => {
  if (config.get("TOKEN_GENERATOR") !== "jwt") return next();

  const token = req.header("x-auth-token");
  if (!token) return handleError(res, 401, "Access denied. Please Login.");

  const userInfo = verifyToken(token);
  if (!userInfo) return handleError(res, 401, "Access denied. Unauthorized user.");

  req.user = userInfo;
  next();
};

module.exports = auth;
