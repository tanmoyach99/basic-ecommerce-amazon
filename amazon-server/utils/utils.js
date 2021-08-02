const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    { expiresIn: "30d" }
  );
};

module.exports = generateToken;

// const isAuth = (req, res, next) => {
//   console.log(req.headers);
//   const authorization = req.headers.authorization;
//   // console.log(authorization);
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length0);
//     jwt.verify(
//       token,
//       process.env.JWT_SECRET || "somethingsecret",
//       (err, decode) => {
//         if (err) {
//           res.status(401).send({ message: "invalid token" });
//         } else {
//           req.user = decode;
//           next();
//         }
//       }
//     );
//   } else {
//     res.status(401).send({ message: "No Token" });
//   }
// };
// const isAuth = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
//     jwt.verify(
//       token,
//       process.env.JWT_SECRET || "somethingsecret",
//       (err, decode) => {
//         if (err) {
//           res.status(401).send({ message: "Invalid Token" });
//         } else {
//           req.user = decode;
//           next();
//         }
//       }
//     );
//   } else {
//     res.status(401).send({ message: "No Token" });
//   }
// };

// module.exports = isAuth;
