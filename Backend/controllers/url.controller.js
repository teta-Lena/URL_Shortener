const UniqueID = require("short-unique-id");

const shortID = new UniqueID({ length: 8 });

const { URL_Shortener, stringIsAValidUrl } = require("../models/url.model");
const { json } = require("body-parser");

const urlController = {};

urlController.generateNewShortURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(404).json({ message: "URL is required" });
  }

  if (stringIsAValidUrl(url) == false) {
    return res.status(400).json({ message: "This is not a valid URL" });
  }

  const existingurl = await URL_Shortener.findOne({ redirectURL: url });

  if (existingurl) {
    return res.status(400).json({ message: "Short URL link already exists!" });
  }

  const newURL = shortID.rnd();
  const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  try {
    await URL_Shortener.create({
      shortId: newURL,
      redirectURL: url,
      clicks: [],
      expiresAt: expiryDate,
    });

    return res.status(200).json({ message: "Success", shortId: newURL });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

urlController.getUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const originalURL = await URL_Shortener.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          clicks: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log("here");

    res.redirect(originalURL.redirectURL), json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: `Error ${error} occured !` });
  }
};

urlController.analytics = async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await URL_Shortener.findOne({ shortId });
    return res.json({
      totalClicks: url.clicks.length,
      analytics: url.clicks,
    });
  } catch (err) {
    res.status(500).json({ message: `Error ${error} occured !` });
  }
};

urlController.deleteExpiredURLs = async () => {
  try {
    await URL_Shortener.deleteMany({ expiresAt: { $lte: new Date() } });
  } catch (err) {
    console.error("Error deleting expired URLs:", error);
  }
};

const runDeleteExpiredUrls = async () => {
  await urlController.deleteExpiredURLs();
  setTimeout(runDeleteExpiredUrls, 24 * 60 * 60 * 1000);
};

runDeleteExpiredUrls();
module.exports = urlController;
