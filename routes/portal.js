const express = require("express");
const path = require("path");
const router = express.Router();

router.use(
  "/",
  express.static(path.join(__dirname, "../../frontend/portal/dist/"))
);

router.get("/", (req, res) => {
  res.send("<h1>Redirecting...</h1>");
});

router.get("/*path", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/portal/dist/", "index.html")
  );
});

module.exports = router;
