const { controllerWrapper } = require("../../decorators");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscribe = require("./updateSubscribe");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  updateSubscribe: controllerWrapper(updateSubscribe),
  updateAvatar: controllerWrapper(updateAvatar),
};
