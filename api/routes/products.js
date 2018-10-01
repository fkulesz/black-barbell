var express = require("express");
var router = express.Router();
const verifyToken = require('../config/jwt');
const ProductsController = require('../controllers/ProductsController');
const TransactionsController = require('../controllers/TransactionsController');

//PRODUCTS API ROUTES
router.get("/api/products", verifyToken, ProductsController.getProducts);
router.post("/api/products", verifyToken, ProductsController.newProduct);
router.get("/api/products/:id", verifyToken, ProductsController.getProduct);
router.put("/api/products/:id", verifyToken, ProductsController.editProduct);
router.delete("/api/products/:id", verifyToken, ProductsController.deleteProduct);
router.get("/api/products/:prod_id/transactions", verifyToken, TransactionsController.getTransactions);

module.exports = router;