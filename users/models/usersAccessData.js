const { generateUserPassword, comparePassword } = require("../../cards/helpers/bcrypt");
const { handleBadRequest } = require("../../utils/errorHandler");
const User = require("./mongodb/User");
const lodash = require("lodash");
const { generateAuthToken } = require("../../auth/providers/jwt");


const registerUser = async (normalizedUser) => {
  try {
    const { email } = normalizedUser;
    let user = await User.findOne({ email });
    if (user) throw new Error("User already registered");

    user = new User(normalizedUser);
    user.password = generateUserPassword(user.password);
    await user.save();

    return lodash.pick(user, ["_id", "name", "email"]);
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    if (!comparePassword(password, user.password)) {
      throw new Error("Invalid email or password");
    }

    return generateAuthToken(user);
  } catch (error) {
    error.status = 400;
    return handleBadRequest("Mongoose", error);
  }
};

const getUsers = async () => {
  try {
    return await User.find().select("-password -__v").lean();
  } catch (error) {
    error.status = 404;
    return handleBadRequest("Mongoose", error);
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password -__v").lean();
    if (!user) throw new Error("Could not find this user in the database");
    return user;
  } catch (error) {
    error.status = 404;
    return handleBadRequest("Mongoose", error);
  }
};

const editUser = async (userId, normalizedUser) => {
  try {
    const user = await User.findByIdAndUpdate(userId, normalizedUser, { new: true }).select("-password -__v");
    if (!user) throw new Error("User not found in the database");
    return user;
  } catch (error) {
    error.status = 404;
    return handleBadRequest("Mongoose", error);
  }
};

const changeUserBusinessStatus = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      [{ $set: { isBusiness: { $eq: [false, "$isBusiness"] } } }],
      { new: true }
    ).select("-password -__v");

    if (!user) throw new Error("User not found in the database");
    return user;
  } catch (error) {
    error.status = 400;
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId).select("-password -__v");
    if (!user) throw new Error("User not found in the database");
    return user;
  } catch (error) {
    error.status = 400;
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  editUser,
  changeUserBusinessStatus,
  deleteUser,
};
