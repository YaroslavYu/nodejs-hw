const { Contact, addContactSchema } = require("../../models");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404);
  res.json(result);
};

module.exports = updateContact;
