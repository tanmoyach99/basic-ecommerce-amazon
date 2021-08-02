const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

const stripe = require("stripe")(
  "sk_test_51Iu0RzDVuG4dQji91qi6MgBR3yf2Ou3itdqb9JGSFlMfolbefNBL87rQwQKkd9scRErrT0guiY8zYCFbjCzCK1tV00jhnvxA2m"
);
// console.log(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncHandler(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.totalPrice * 100,
    currency: "usd",
    metadata: {
      integration_check: "accept_a_payment",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// exports.acceptPayment = asyncHandler(async (req, res) => {
//   const { paymentMethodType } = req.body;

//   const params = {
//     payment_method_types: [paymentMethodType],
//     amount: 100,
//     currency: "usd",
//   };

//   try {
//     const paymentIntent = await stripe.paymentIntents.create(params);

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
});
