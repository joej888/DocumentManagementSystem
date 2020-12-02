const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  //const bearerHeader = process.env.TOKEN;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken;
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        res.status(403).json({ message: "Token cannot be verified" });
      } //else {
      //res.status(200).json({message:'Token Verified',data});
      //}
    });
  } else {
    res.status(403).json({ message: "Access denied" });
  }
  next();
};
