const express = require("express");
const router = express.Router();
const AdController = require("../controllers/ads.controller");

router.get("/ads", AdController.getAllAds);
router.get("/ads/:id", AdController.getAdById);
router.post("/ads", AdController.addAd);
router.put("/ads/:id", AdController.updateAd);
router.delete("/ads:id", AdController.deleteAd);
router.get("/ads/search/:searchPhrase", AdController.searchPhrase);

module.exports = router;
