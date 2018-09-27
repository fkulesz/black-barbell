var express = require("express");
var router = express.Router();
const ContactsController = require('../controllers/ContactsController');
const VisitsController = require('../controllers/VisitsController');
const TicketsController = require('../controllers/TicketsController');
const TransactionsController = require('../controllers/TransactionsController');

//CONTACTS API ROUTES
router.get("/api/contacts", ContactsController.getContacts);
router.post("/api/contacts", ContactsController.newContact);
router.get("/api/contacts/:id", ContactsController.getContact);
router.put("/api/contacts/:id", ContactsController.editContact);
router.delete("/api/contacts/:id", ContactsController.deleteContact);
router.get("/api/contacts/:id/visits", VisitsController.getVisits);
router.get("/api/contacts/:id/tickets", TicketsController.getTickets);
router.get("/api/contacts/:id/transactions", TransactionsController.getTransactions);

module.exports = router;