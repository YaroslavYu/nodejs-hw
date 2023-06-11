const { Contact, updContactFavoriteSchema } = require("../../models");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { error } = updContactFavoriteSchema.validate(req.body);
  if (error) throw HttpError(400, "missing field favorite");
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    {
      new: true,
    }
  );
  if (!result) throw HttpError(404);
  res.json(result);
};

module.exports = updateStatusContact;
