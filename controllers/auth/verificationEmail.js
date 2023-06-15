const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verificationEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, "User not found");
  const { _id } = user;
  await User.findOneAndUpdate(
    { _id },
    { verificationToken: null, verify: true }
  );
  res.json({
    message: "Verification successful",
  });
};

module.exports = verificationEmail;
