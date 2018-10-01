var express = require("express");
var router = express.Router();
const verifyToken = require('../config/jwt');
const TransactionsController = require('../controllers/TransactionsController');

//CONTACTS API ROUTES
router.get("/api/transactions", verifyToken, TransactionsController.getTransactions);
router.post("/api/transactions", verifyToken, TransactionsController.newTransaction);
router.get("/api/transactions/:id", verifyToken, TransactionsController.getTransaction);
router.put("/api/transactions/:id", verifyToken, TransactionsController.editTransaction);
router.delete("/api/transactions/:id", verifyToken, TransactionsController.deleteTransaction);

module.exports = router;