const bcrypt = require("bcrypt");

const { User, signInSchema } = require("../../models");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { error } = signInSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = registerUser;
