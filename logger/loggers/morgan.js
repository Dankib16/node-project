const chalk = require("chalk");
const morgan = require("morgan");

const logger = morgan((tokens, req, res) => {
  const isError = tokens.status(req, res) >= 400;
  const color = isError ? chalk.redBright : chalk.cyanBright;

  return color(
    [
      "[",
      tokens.date(req, res),
      "]:",
      tokens.method(req, res),
      ",",
      tokens.url(req, res),
      ",",
      tokens.status(req, res) || "-",
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ")
  );
});

module.exports = logger;
