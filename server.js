const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const portalRoutes = require("./routes/portal");
const apiRoutes = require("./routes/api");

mongoose
  .connect("mongodb://127.0.0.1:27017/filament-site")
  .then(() => console.log("Mongo has started"))
  .catch(console.log);

const app = express();
const sess = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: null },
};

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sess));

app.get("/", (req, res) => {
  res.redirect("/portal");
});

app.use("/portal", portalRoutes);
app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  res.json(err.message);
});

app.listen(4000, () => {
  console.log("SERVER HAS STARTED");
});
