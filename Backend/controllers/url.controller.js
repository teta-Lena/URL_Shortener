const UniqueID = require("short-unique-id");

const shortID = new UniqueID({ length: 8 });
const URL_Shortener = require("../models/url.model");

const urlController = {};

urlController.generateNewShortURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(404).json({ message: "URL is required" });
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

module.exports = urlController;
