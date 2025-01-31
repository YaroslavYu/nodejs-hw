const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer" || !token) {
      next(HttpError(401, "Not authorized"));
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token)
      next(HttpError(401, "Not authorized"));

    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
