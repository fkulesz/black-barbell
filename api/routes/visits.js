var express = require("express");
var router = express.Router();
const VisitsController = require('../controllers/VisitsController');

//VISITS API ROUTES
router.get("/api/visits", VisitsController.getVisits);
router.post("/api/visits", VisitsController.newVisit);
router.get("/api/visits/:id", VisitsController.getVisit);
router.put("/api/visits/:id", VisitsController.editVisit);
router.delete("/api/visits/:id", VisitsController.deleteVisit);

module.exports = router;