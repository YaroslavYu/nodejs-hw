const { HttpError, sendEmail } = require("../../helpers");
const { User, verifyEmailSchema } = require("../../models");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { error } = verifyEmailSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const { verificationToken } = user;

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
