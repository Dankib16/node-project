const config = require("config");
const HOST = config.get("HOST");
const PORT = config.get("PORT");

const normalizeUser = (rawUser) => {
  return {
    ...rawUser,
    name: {
      ...rawUser.name,
      middle: rawUser.name.middle && rawUser.name.middle.length >= 2 ? rawUser.name.middle : undefined,
    },
    image: {
      url: rawUser.image && rawUser.image.url ? rawUser.image.url : "https://via.placeholder.com/150",
      alt: rawUser.image && rawUser.image.alt ? rawUser.image.alt : "Default user avatar",
    },
    address: {
      ...rawUser.address,
      state: rawUser.address.state || "not defined",
    },
  };
};

module.exports = normalizeUser;
