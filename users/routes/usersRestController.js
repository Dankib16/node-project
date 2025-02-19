const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  editUser,
  changeUserBusinessStatus,
  deleteUser,
} = require("../models/usersAccessData");
const {
  validateRegistration,
  validateLogin,
  validateUserToEdit,
} = require("../validations/userValidationService");
const normalizeUser = require("../helpers/normalizeUser");
const auth = require("../../auth/authService");

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateRegistration(body);
    if (error) return handleError(res, 400, error.details[0].message);

    const normalizedUser = await normalizeUser(body);
    const user = await registerUser(normalizedUser);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateLogin(body);
    if (error) return handleError(res, 400, error.details[0].message);

    const user = await loginUser(body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) return handleError(res, 403, "Only admins can view users.");
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { _id, isAdmin } = req.user;
    const { id } = req.params;
    if (_id !== id && !isAdmin) return handleError(res, 403, "Access denied.");

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (req.user._id !== id) return handleError(res, 403, "You can only edit your own profile.");

    const { error } = validateUserToEdit(body);
    if (error) return handleError(res, 400, error.details[0].message);

    const normalizedUser = await normalizeUser(body);
    const updatedUser = await editUser(id, normalizedUser);
    return res.send(updatedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    if (_id !== id) return handleError(res, 403, "Only you can change your business status.");

    const user = await changeUserBusinessStatus(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { _id, isAdmin } = req.user;
    const { id } = req.params;
    if (_id !== id && !isAdmin) return handleError(res, 403, "Only the owner or an admin can delete.");

    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.use((req, res) => handleError(res, 404, "Page not found in users"));

module.exports = router;
