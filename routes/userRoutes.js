import { signIn } from "../controllers/userControllers.js";

import { Router } from "express";

const userRouter = Router();

// Route/Endpoint for submiting responses for the list of questions for specific survey.
userRouter.post("/signin", signIn);

export default userRouter;