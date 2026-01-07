import express from "express";
import { shortUrl, urlShortener } from "../controllers/urlShortener.controller.js";

const urlRouter = express.Router();

urlRouter.post("/shortener", urlShortener )
urlRouter.get("/:shortUrl", shortUrl)




export default urlRouter;