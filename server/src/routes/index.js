import express from "express";
import deline from 'deline';
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const timestamp = new Date().toLocaleString();
  res.header("Content-Type", "text/html").send(deline`<html><body>
    <h1>404</h1>
    <p>Server time is ${timestamp}</p>
    </body></html>`);
});

module.exports = router;
