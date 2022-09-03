import { Request, Response, Router } from "express";
import storeValidator from "../validators/shortenedUrl/storeValidator";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.render("home");
});

router.post("/", (request: Request, response: Response) => {
  try {
    const { body } = request;
    const { error } = storeValidator.validate(body);

    if (error) {
      return response.status(422).json(error);
    }

    // TODO: create the shortened url
    return response.status(200).json("OK");
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default router;
