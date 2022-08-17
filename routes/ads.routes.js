const express = require("express");
const router = express.Router();
const AdController = require("../controllers/ads.controller");
const authMiddleware = require("../utils/authMiddleware");

router.get("/ads", AdController.getAllAds);
router.get("/ads/:id", AdController.getAdById);
router.post("/ads", authMiddleware, AdController.addAd);
router.put("/ads/:id", authMiddleware, AdController.updateAd);
router.delete("/ads:id", authMiddleware, AdController.deleteAd);
router.get("/ads/search/:searchPhrase", AdController.searchPhrase);

module.exports = router;
