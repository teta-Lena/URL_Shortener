const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: [{ timestamp: { type: Number } }],
    redirectURL: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const URL_Shortener = mongoose.model("urlShortener", urlSchema);

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { URL_Shortener, stringIsAValidUrl };
