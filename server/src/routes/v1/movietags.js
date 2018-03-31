import express from "express";
const router = express.Router();

const allqry = `
  SELECT
    m.movieid,
    j.prodcode,
    m.tagid,
    t.category,
    t.tag
  FROM map_movie_tag m
  JOIN movie j ON(m.movieid = j.id)
  JOIN tag t ON(m.tagid = t.id)`;

// Get details on all tags for all movies
router.get("/all", (req, res) => {
  res.locals.connection.query(allqry,
    (error, results) => {
    res.setHeader("Content-Type", "application/json");
    if (error) {
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}, null, 2));
      throw error;
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}, null, 2));
    }
  });
});

// Get details on all tags for a single movie
router.get("/:movieid", (req, res) => {
  res.locals.connection.query(allqry + ` WHERE m.movieid = ?`, [req.params.movieid],
    (error, results) => {
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
    m.movieid,
    GROUP_CONCAT(t.tag SEPARATOR ",") AS tags
  FROM map_movie_tag m
  JOIN movie j ON(m.movieid = j.id)
  JOIN tag t ON(m.tagid = t.id)`;

// Get tags concatenated into a single string for a single movie
router.get("/concat/:movieid", (req, res) => {
  res.locals.connection.query(concatqry + ` WHERE m.movieid = ?`, [req.params.movieid],
    (error, results) => {
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
