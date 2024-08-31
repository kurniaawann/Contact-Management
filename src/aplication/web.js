import express from "express";
import { errorMiddleware } from "../midleware/error-middleware.js";
import { publicRouter } from "../route/public-api.js";
import { userRouter } from "../route/user-router.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
