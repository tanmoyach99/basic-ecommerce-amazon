const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { processPayment, acceptPayment } = require("../paymentController");
const isAuth = require("../utils/auth.js");

const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
    console.log(orders);
  })
);

orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req, res) => {
    if (req.body.orderItems === 0) {
      res.send(400).status({ message: "cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      //   console.log("mmmmm", order.user);
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "new order created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  //   isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    // console.log(order);
    if (order) {
      res.send(order);
    } else {
      res.status(400).send({ message: "order not found" });
    }
  })
);
orderRouter.post("/:id/pay", processPayment);
// orderRouter.post("/:id/confirm", acceptPayment);
orderRouter.put(
  "/:id/pay/payment",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
    );
    console.log(req.body);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "order paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "payment process error" });
    }
    console.log(order);
  })
);
// orderRouter.post("/:id/pay/payment", isAuth, processPayment);

module.exports = orderRouter;
