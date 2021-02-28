// firstrun - Router
const express = require('express');
const router = express.Router();

// sampleCategory Data base /sampleData
const sampleCategory = require('./sampleCategory');
router.route('/').post(sampleCategory);

module.exports = router;
