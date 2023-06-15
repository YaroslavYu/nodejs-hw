const express = require("express");
const router = express.Router();

const { usersController } = require("../../controllers");
const { authenticate, upload } = require("../../middlewares");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", authenticate, usersController.logout);
router.get("/current", authenticate, usersController.current);
router.patch("/", authenticate, usersController.updateSubscribe);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  usersController.updateAvatar
);

router.get("/verify/:verificationToken", usersController.verificationEmail);
router.post("/verify", usersController.resendVerifyEmail);

module.exports = router;
