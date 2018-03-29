import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.header("Content-Type", "text/html").send("<html><body><h1>404</h1></body></html>");
});

module.exports = router;
