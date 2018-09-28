var express = require("express");
var router = express.Router();
const ProductsController = require('../controllers/ProductsController');
const TransactionsController = require('../controllers/TransactionsController');

//PRODUCTS API ROUTES
router.get("/api/products", ProductsController.getProducts);
router.post("/api/products", ProductsController.newProduct);
router.get("/api/products/:id", ProductsController.getProduct);
router.put("/api/products/:id", ProductsController.editProduct);
router.delete("/api/products/:id", ProductsController.deleteProduct);
router.get("/api/products/:prod_id/transactions", TransactionsController.getTransactions);

module.exports = router;