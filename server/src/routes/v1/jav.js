import express from "express";
const router = express.Router();

const qry = `
  SELECT
    j.id,
    j.created,
    j.updated,
    j.title,
    j.prodcode,
    g.code AS genre,
    r.rating,
    j.createdby AS userid,
    u.name AS username,
    GROUP_CONCAT(t.tag SEPARATOR ",") AS tags
  FROM jav j
  JOIN genre g ON(j.genreid = g.id)
  JOIN rating r ON(j.ratingid = r.id)
  JOIN user u ON(j.createdby = u.id)
  JOIN map_jav_tag m ON(j.id = m.javid)
  JOIN tag t ON(m.tagid = t.id)`;

router.get("/all", (req, res, next) => {
  res.locals.connection.query(qry,
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

router.get("/:id", (req, res, next) => {
  res.locals.connection.query(qry + ` WHERE j.id = ?`, [req.params.id],
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
