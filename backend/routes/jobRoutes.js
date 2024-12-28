const express = require('express');
const { getJobs } = require('../controllers/jobController.js');

const router = express.Router();

router.get('/', getJobs);

module.exports = router;
