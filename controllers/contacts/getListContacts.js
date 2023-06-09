const { Contact } = require("../../models");

const getListContacts = async (req, res) => {
  res.json(await Contact.find());
};

module.exports = getListContacts;
