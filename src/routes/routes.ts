import { expressionStatement } from "@babel/types";
import { Router } from "express";
import apiRouter from "./api/ApiRouter";
import { Request, Response } from "express";
const baseRouter = Router();

baseRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ body: "Hello" });
});

baseRouter.use("/api", apiRouter);

export default baseRouter;
