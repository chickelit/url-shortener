import { ShortenedUrl } from "../database/sequelize";
import { Request, Response, Router } from "express";
import storeValidator from "../validators/shortenedUrl/storeValidator";
import crypto from "crypto";

const router = Router();

interface StoreAttributes {
  url: string;
  redirectUrl: string;
}

router.get("/", (request: Request, response: Response) => {
  return response.render("home");
});

router.post("/", async (request: Request, response: Response) => {
  try {
    const body: StoreAttributes = request.body;
    const { error } = storeValidator.validate(body);

    if (error) {
      return response.status(422).json(error);
    }

    const key = crypto.randomBytes(4).toString("hex");
    const parsedUrl = body.url.replace(/\/$/, "");

    const { shortenedUrl } = await ShortenedUrl.create({
      originalUrl: parsedUrl,
      key,
      shortenedUrl: `${process.env.APP_URL!.replace(/\/$/, "")}/${key}`,
    });

    return response.render("home", { shortenedUrl });
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default router;
