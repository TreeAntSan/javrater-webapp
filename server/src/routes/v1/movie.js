import express from "express";
import uniq from "lodash/uniq";
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
  FROM movie j
  JOIN genre g ON(j.genreid = g.id)
  JOIN rating r ON(j.ratingid = r.id)
  JOIN user u ON(j.createdby = u.id)
  JOIN map_movie_tag m ON(j.id = m.movieid)
  JOIN tag t ON(m.tagid = t.id)`;

router.get("/all", (req, res) => {
  res.locals.connection.query(qry,
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

router.get("/:id", (req, res) => {
  res.locals.connection.query(qry + ` WHERE j.id = ?`, [req.params.id],
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

const insertMovieQry = `
  INSERT INTO movie
    (created, updated, title, prodcode, ratingid, genreid, createdby)
  VALUES
    (NOW(), NOW(), ?, ?, ?, ?, ?)
`;

const insertTagsQry = `
  INSERT INTO map_movie_tag
    (created, updated, movieid, tagid)
  VALUES
`;

router.post("/add", (req, res) => {
  res.locals.connection.query(insertMovieQry, [
      req.body.title,
      req.body.prodcode,
      req.body.ratingid,
      req.body.genreid,
      req.body.createdby,
    ],
    (error, results) => {
      res.setHeader("Content-Type", "application/json");
      if (error) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}, null, 2));
        throw error;
      } else {
        // Movie inserted successfully, try to insert tags
        const newMovieId = results.insertId;
        let valueClauses = [];

        req.body.tags.replace(/\s/g,"").split(",").forEach(tag => {
          const tagId = parseInt(tag, 10);  // Take care, this can return NaN
          if (tagId > 0) {  // Ignore negative or NaN ids
            valueClauses.push(` (NOW(), NOW(), ${newMovieId}, ${res.locals.connection.escape(tagId)})`);
          }
        });

        // Tag inserts are constructed, now to combine and insert them together
        // Use lodash's uniq to remove duplicate tags, a courtesy, the DB will reject otherwise due to unique index m_t
        const joinedValueClause = uniq(valueClauses).join(",");
        if (joinedValueClause) {
          res.locals.connection.query(insertTagsQry + joinedValueClause,
            (error) => {
              if (error) {
                // Failed to insert tags, will still return new movie id
                res.send(JSON.stringify({"status": 500, "error": error, "response": newMovieId}, null, 2));
                throw error;
              } else {
                res.send(JSON.stringify({"status": 201, "error": null, "response": newMovieId}, null, 2));
              }
            }
          )
        } else {
          // Because queries are async if the tags fail this will be sent before the failure happens.
          res.send(JSON.stringify({"status": 201, "error": null, "response": newMovieId}, null, 2));
        }
      }
    });
});

module.exports = router;
