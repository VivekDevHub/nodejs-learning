let express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

let router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  try {
    console.log(req.user);
    return res.send("ok me home ke andr hu");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;