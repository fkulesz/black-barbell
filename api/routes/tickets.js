var express = require("express");
var router = express.Router();
const TicketsController = require('../controllers/TicketsController');

//TICKETS API ROUTES
router.get("/api/tickets", TicketsController.getTickets);
router.post("/api/tickets", TicketsController.newTicket);
router.get("/api/tickets/:id", TicketsController.getTicket);
router.put("/api/tickets/:id", TicketsController.editTicket);
router.delete("/api/tickets/:id", TicketsController.deleteTicket);

module.exports = router;