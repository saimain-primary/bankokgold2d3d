const express = require("express");

const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { storeData } = require("./controllers/admin/storeData");
const cron = require("node-cron");

cron.schedule("0 8 * * *", () => {
  storeData();
});

cron.schedule("0 10 * * *", () => {
  storeData();
});

cron.schedule("0 12 * * *", () => {
  storeData();
});

cron.schedule("0 14 * * *", () => {
  storeData();
});

cron.schedule("0 16 * * *", () => {
  storeData();
});

cron.schedule("0 19 * * *", () => {
  storeData();
});

cron.schedule("0 22 * * *", () => {
  storeData();
});

const adminRoutes = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoute");

const dbURI = process.env.DB_URI;

const app = express();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("tiny"));
app.use(express.static("public"));

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log("App is running at Port " + port);
    app.listen(port);
  })
  .catch((err) => console.log(err));

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.use((req, res) => {
  res.status(404).render("404.ejs");
});
