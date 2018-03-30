import express from "express";
const router = express.Router();

const allqry = `
  SELECT
    m.javid,
    j.prodcode,
    m.tagid,
    t.category,
    t.tag
  FROM map_jav_tag m
  JOIN jav j ON(m.javid = j.id)
  JOIN tag t ON(m.tagid = t.id)`;

// Get details on all tags for all javs
router.get("/all", (req, res, next) => {
  res.locals.connection.query(allqry,
    (error, results, fields) => {
    res.setHeader("Content-Type", "application/json");
    if (error) {
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}, null, 2));
      throw error;
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}, null, 2));
    }
  });
});

// Get details on all tags for a single jav
router.get("/:javid", (req, res, next) => {
  res.locals.connection.query(allqry + ` WHERE m.javid = ?`, [req.params.javid],
    (error, results, fields) => {
      res.setHeader("Content-Type", "application/json");
      if (error) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}, null, 2));
        throw error;
      } else {
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}, null, 2));
      }
    });
});

const concatqry = `
  SELECT
    m.javid,
    GROUP_CONCAT(t.tag SEPARATOR ",") AS tags
  FROM map_jav_tag m
  JOIN jav j ON(m.javid = j.id)
  JOIN tag t ON(m.tagid = t.id)`;

// Get tags concatenated into a single string for a single jav
router.get("/concat/:javid", (req, res, next) => {
  res.locals.connection.query(concatqry + ` WHERE m.javid = ?`, [req.params.javid],
    (error, results, fields) => {
      res.setHeader("Content-Type", "application/json");
      if (error) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}, null, 2));
        throw error;
      } else {
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}, null, 2));
      }
    });
});

module.exports = router;
