import { ShortenedUrl } from "../database/sequelize";
import { Request, Response, Router } from "express";
import storeValidator from "../validators/shortenedUrl/storeValidator";
import crypto from "crypto";

const router = Router();

interface PostAttributes {
  url: string;
  redirectUrl: string;
}

router.post("/shortened-urls", async (request: Request, response: Response) => {
  try {
    const body: PostAttributes = request.body;
    const { error } = storeValidator.validate(body);

    if (error) {
      return response.status(422).json(error);
    }

    const key = crypto.randomBytes(4).toString("hex");
    const redirectUrl = body.redirectUrl.replace(/\/$/, "");

    const shortenedUrl = await ShortenedUrl.create({
      key,
      originalUrl: body.url,
      shortenedUrl: `${redirectUrl}/${key}`,
    });

    return response.status(200).json(shortenedUrl);
  } catch (error) {
    return response.status(500).json(error);
  }
});

router.get("/:key", async (request: Request, response: Response) => {
  const { key } = request.params;

  try {
    const shortenedUrlInstance = await ShortenedUrl.findOne({
      where: {
        key,
      },
    });

    if (!shortenedUrlInstance) {
      return response.status(404).json({
        message: "URL not found.",
      });
    }

    return response.status(200).json(shortenedUrlInstance);
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default router;
