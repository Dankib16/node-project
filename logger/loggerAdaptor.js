const morganLogger = require("./loggers/morgan");

const logger = process.env.LOGGER === "morgan" ? morganLogger : (req, res, next) => next();

module.exports = logger;
