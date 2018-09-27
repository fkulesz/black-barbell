var express = require("express");
var router = express.Router();
const ContactsController = require('../controllers/ContactsController');

//CONTACTS API ROUTES
router.get("/api/contacts", ContactsController.getContacts);
router.post("/api/contacts", ContactsController.newContact);
router.get("/api/contacts/:id", ContactsController.getContact);
router.put("/api/contacts/:id", ContactsController.editContact);
router.delete("/api/contacts/:id", ContactsController.deleteContact);

module.exports = router;