import { config } from "dotenv";
import express, { json, Request, Response } from "express";
import connectdb from "./config/db";
import authRouter from "./route/authRouter";

config();

// Connect Database
connectdb();

const app = express();

// Middleware
app.use(json());

//router
app.use("/api/user", authRouter);

//test route in browser(http://localhost:PORT/)
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("<h1>This is my first API with MongoDB and typeScript!</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅  Server runnung on Port ${PORT}`);
});
