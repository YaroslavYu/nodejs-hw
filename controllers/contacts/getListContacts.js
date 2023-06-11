const { Contact } = require("../../models");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  skip = (page - 1) * limit;

  if (favorite !== undefined) {
    const result = await Contact.find({ owner, favorite })
      .skip(skip)
      .limit(limit);

    res.json(result);
  }

  const result = await Contact.find({ owner }).skip(skip).limit(limit);
  res.json(result);
};

module.exports = getListContacts;
