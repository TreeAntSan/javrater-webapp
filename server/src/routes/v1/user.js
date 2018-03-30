import express from "express";
const router = express.Router();

router.get("/", function(req, res, next) {
  res.locals.connection.query(`SELECT * from user`,
    (error, results, fields) => {
    res.setHeader("Content-Type", "application/json");
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      throw error;
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    }
  });
});

module.exports = router;
