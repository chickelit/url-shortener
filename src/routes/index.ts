import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.render("home");
});

router.post("/", (request: Request, response: Response) => {
  return response.send(JSON.stringify(request.body));
});

export default router;
