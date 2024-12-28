const express = require("express");
const { uploadResume, getJobRecommendations } = require("../controllers/userController.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

// Route for uploading resume
router.post("/upload", upload.single("resume"), uploadResume);

// Route for getting job recommendations based on resume
router.get("/recommendations", getJobRecommendations);

module.exports = router;
