const { controllerWrapper } = require("../../decorators");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscribe = require("./updateSubscribe");
const updateAvatar = require("./updateAvatar");
const verificationEmail = require("./verificationEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  updateSubscribe: controllerWrapper(updateSubscribe),
  updateAvatar: controllerWrapper(updateAvatar),
  verificationEmail: controllerWrapper(verificationEmail),
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
};
