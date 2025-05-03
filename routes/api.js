const productRoutes = require("./products");
const orderRoutes = require("./orders");
const materialRoutes = require("./materials");
const userRoutes = require("./users");
const router = require("express").Router();

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/materials", materialRoutes);
router.use("/users", userRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    status: "connected",
  });
});

module.exports = router;
