const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const data = require("./Data/data");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/amazon-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => {
  res.send("server is ready  ");
});

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/payment", paymentRouter);
app.get("/api/config/stripe", (req, res) => {
  res.send(process.env.STRIPE_API_KEY);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`app is ready http://localhost:${port}`);
});
