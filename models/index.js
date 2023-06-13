const {
  Contact,
  addContactSchema,
  updContactFavoriteSchema,
} = require("./contact");

const {
  User,
  signInSchema,
  updateSubscribeSchema,
  verifyEmailSchema,
} = require("./user");

module.exports = {
  Contact,
  addContactSchema,
  updContactFavoriteSchema,
  User,
  signInSchema,
  updateSubscribeSchema,
  verifyEmailSchema,
};
