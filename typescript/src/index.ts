import { config } from "dotenv";
import express, { json, Request, Response } from "express";
import connectdb from "./config/db";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import cors from "cors";

config();

// Connect Database
connectdb();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// Middleware
app.use(json());

//router
app.use("/api/auth", authRouter);
app.use("/api/users",userRouter)

//test route in browser(http://localhost:PORT/)
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("<h1>This is my first API with MongoDB and typeScript!</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  Server runnung on Port ${PORT}`);
});
