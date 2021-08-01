import { Router } from "express";

const LoginRouter = Router();

LoginRouter.post("/", (req, res) => {
  return res.status(200).send(req.body);
});

LoginRouter.get("/", (req, res) => {
  return res.send("get login").status(200);
});

export default LoginRouter;
