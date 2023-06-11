const { User, updateSubscribeSchema } = require("../../models");
const { HttpError } = require("../../helpers");

const updateSubscribe = async (req, res) => {
  const { error } = updateSubscribeSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findOneAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!result) throw HttpError(404);
  res.json({ message: "Subscription is changed" });
};

module.exports = updateSubscribe;
