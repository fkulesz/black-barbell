var express = require("express");
var router = express.Router();
const verifyToken = require('../config/jwt');
const ContactsController = require('../controllers/ContactsController');
const VisitsController = require('../controllers/VisitsController');
const TicketsController = require('../controllers/TicketsController');
const TransactionsController = require('../controllers/TransactionsController');

//CONTACTS API ROUTES
router.get("/api/contacts", verifyToken, ContactsController.getContacts);
router.post("/api/contacts", ContactsController.newContact);
router.get("/api/contacts/:id", verifyToken, ContactsController.getContact);
router.put("/api/contacts/:id", verifyToken, ContactsController.editContact);
router.delete("/api/contacts/:id", verifyToken, ContactsController.deleteContact);
router.get("/api/contacts/:id/visits", verifyToken, VisitsController.getVisits);
router.get("/api/contacts/:id/tickets", verifyToken, TicketsController.getTickets);
router.get("/api/contacts/:id/transactions", verifyToken, TransactionsController.getTransactions);

module.exports = router;