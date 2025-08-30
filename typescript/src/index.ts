import express, { json } from "express";

const app = express();

app.use(json());

app.get("/", (_req, res) => {
  res
    .status(200)
    .send("<h1>This is my first API with MongoDB and typeScript!</h1>");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server runnung on Port ${PORT}`);
});
