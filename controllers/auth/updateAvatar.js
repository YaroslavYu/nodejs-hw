const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const avatarsPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) throw HttpError(422, "You did not send a file.");

  const { filename, path: imagePath } = req.file;
  const avatarNewPath = path.resolve(avatarsPath, filename);

  await Jimp.read(imagePath)
    .then((avatar) =>
      avatar.resize(256, 256).quality(60).greyscale().write(imagePath)
    )
    .catch((err) => {
      console.error(err);
    });

  await fs.rename(imagePath, avatarNewPath);

  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL: avatarNewPath },
    { new: true }
  );
  if (!result) throw HttpError(404);

  const { avatarURL } = result;

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
