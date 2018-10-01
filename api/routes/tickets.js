var express = require("express");
var router = express.Router();
const TicketsController = require('../controllers/TicketsController');
const verifyToken = require('../config/jwt');

//TICKETS API ROUTES
router.get("/api/tickets", verifyToken, TicketsController.getTickets);
router.post("/api/tickets", verifyToken, TicketsController.newTicket);
router.get("/api/tickets/:id", verifyToken, TicketsController.getTicket);
router.put("/api/tickets/:id", verifyToken, TicketsController.editTicket);
router.delete("/api/tickets/:id", verifyToken, TicketsController.deleteTicket);

module.exports = router;