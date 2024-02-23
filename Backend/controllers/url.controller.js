const UniqueID = require("short-unique-id");

const shortID = new UniqueID({ length: 8 });
const URL_Shortener = require("../models/url.model");
const { json } = require("body-parser");

const urlController = {};

urlController.generateNewShortURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(404).json({ message: "URL is required" });
  }

  const existingurl = await URL_Shortener.findOne({ redirectURL: url });

  if (existingurl) {
    return res.status(400).json({ message: "Short URL link already exists!" });
  }

  const newURL = shortID.rnd();

  try {
    await URL_Shortener.create({
      shortId: newURL,
      redirectURL: url,
      clicks: [],
    });

    return res.status(200).json({ shortId: newURL });
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
module.exports = urlController;
