import { nanoid } from "nanoid";
import Url from "../model/url.model.js";

// take original url, make a short url using nanoid and save both in db
export const urlShortener = async (req, res) => {
  try {
    // check url is given or not
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "Url is required" });
    }
    //  Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.status(200).json({
        data: existingUrl,
        message: "url Already exist",
      });
    }
    // Generate short ID
    const shortUrl = nanoid(8);

    // Save to DB
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    return res.status(201).json({
      data: newUrl,
      message: "new url created",
    });
  } catch (error) {
    console.error("URL Shortener Error:", error);
    return res.status(500).json({
      message: "Error from urlShortnerApi",
    });
  }
};

// redirect on shorturl

export const shortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).json({ message: "URL not found" });

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
     return res.status(500).json({ message: "error in redirecting on orignal url" });
  }
};
