const router = require("express").Router();


router.use("/users", require("./User"));
router.use("/api", require("./apiRoutes"));

module.exports = router;