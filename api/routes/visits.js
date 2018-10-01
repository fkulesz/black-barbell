var express = require("express");
var router = express.Router();
const verifyToken = require('../config/jwt');
const VisitsController = require('../controllers/VisitsController');

//VISITS API ROUTES
router.get("/api/visits", verifyToken, VisitsController.getVisits);
router.post("/api/visits", verifyToken, VisitsController.newVisit);
router.get("/api/visits/:id", verifyToken, VisitsController.getVisit);
router.put("/api/visits/:id", verifyToken, VisitsController.editVisit);
router.delete("/api/visits/:id", verifyToken, VisitsController.deleteVisit);

module.exports = router;