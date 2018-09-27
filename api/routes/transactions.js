var express = require("express");
var router = express.Router();
const TransactionsController = require('../controllers/TransactionsController');

//CONTACTS API ROUTES
router.get("/api/transactions", TransactionsController.getTransactions);
router.post("/api/transactions", TransactionsController.newTransaction);
router.get("/api/transactions/:id", TransactionsController.getTransaction);
router.put("/api/transactions/:id", TransactionsController.editTransaction);
router.delete("/api/transactions/:id", TransactionsController.deleteTransaction);

module.exports = router;