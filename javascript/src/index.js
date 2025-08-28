import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import privateRoutes from "./routes/privateRoutes.js"

config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(json());

//router
app.use("/api/auth", authRouter);
app.use("/todo", privateRoutes);


//test route in browser(http://localhost:PORT/)
app.get("/", (_req, res) => {
    res.status(200).send("<h1> My API of MongoosDB</h1>");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server running on the port ${PORT}`);
  
});
