const shortid = require('shortid');
const URL = require('../models/url');

async function handleshortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortId = shortid();

    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory: [], 
        createdBy: req.user._id,
    });

    const allUrls = await URL.find({});

    return res.render("home", {
        id: shortId,
        urls: allUrls,
    });

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory});
}

module.exports = {
    handleshortURL,
    handleGetAnalytics,
}
