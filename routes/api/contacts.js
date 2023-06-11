const express = require("express");

const { authenticate } = require("../../middlewares");
const { contactsController } = require("../../controllers");

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getListContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.updateStatusContact);

module.exports = router;
