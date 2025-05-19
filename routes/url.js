const express = require('express');
const {handleshortURL, handleGetAnalytics} = require('../controllers/url');

const router = express.Router();

router.post("/", handleshortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;