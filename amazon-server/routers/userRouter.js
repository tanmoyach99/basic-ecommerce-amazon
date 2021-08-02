const express = require("express");
const data = require("../Data/data.js");
const User = require("../models/userModal.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/utils.js");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // console.log(req.body.password, user.password);
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "authentication failed" });
  })
);

userRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.compareSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    // console.log(createdUser);
    if (createdUser) {
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        token: generateToken(createdUser),
      });
    }
    res.status(401).send({ message: "authentication failed" });
  })
);

userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    // console.log(user);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  })
);

userRouter.put(
  "/profile",

  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);
    console.log(user);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // if (user.isSeller) {
      //   user.seller.name = req.body.sellerName || user.seller.name;
      //   user.seller.logo = req.body.sellerLogo || user.seller.logo;
      //   user.seller.description =
      //     req.body.sellerDescription || user.seller.description;
      // }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        // isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

module.exports = userRouter;
