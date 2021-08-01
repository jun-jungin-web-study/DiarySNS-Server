import { Router } from "express";
import LoginRouter from "./Login/Login";

const apiRouter = Router();

apiRouter.use("/login", LoginRouter);

export default apiRouter;
