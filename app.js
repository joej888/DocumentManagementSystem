const mongoose = require("mongoose");
const path = require("path");
const body = require("body-parser");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = require("./routes/userRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const { verify } = require("./controllers/verify");
require("dotenv").config();

const MONGODB_URI = "mongodb://localhost:27017/dms";
PORT = process.env.PORT;

app.use(body.json());
app.use(express.static(path.join(__dirname, "./public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", verify, userRoutes);
app.use("/folder",verify, folderRoutes);
app.use("/file", fileRoutes);
app.use("/auth",authRoutes);
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
