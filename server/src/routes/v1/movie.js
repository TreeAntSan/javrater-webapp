import express from "express";
import uniq from "lodash/uniq";
import { sprintf } from "sprintf-js";

const router = express.Router();

const qry = `
  SELECT
    movie.id,
    movie.created,
    movie.updated,
    movie.title,
    movie.prodcode,
    movie.genre,
    movie.rating,
    movie.userid,
    movie.username,
    IFNULL(GROUP_CONCAT(t.tag SEPARATOR ","), '') AS tags
  FROM (SELECT
      m.id,
      m.created,
      m.updated,
      m.title,
      m.prodcode,
      g.code AS genre,
      r.rating,
      m.createdby AS userid,
      u.name AS username
    FROM movie m
    LEFT JOIN genre g ON(m.genreid = g.id)
    LEFT JOIN rating r ON(m.ratingid = r.id)
    LEFT JOIN user u ON(m.createdby = u.id)) AS movie
  LEFT JOIN map_movie_tag mt ON(movie.id = mt.movieid)
  LEFT JOIN tag t ON(mt.tagid = t.id)
  %s
  GROUP BY movie.id`;

router.get("/all", (req, res) => {
  res.locals.connection.query(sprintf(qry, ""),
    (error, results) => {
    res.setHeader("Content-Type", "application/json");
    if (error) {
      res.send(JSON.stringify({status: 500, error: error, response: null}, null, 2));
    } else {
      res.send(JSON.stringify({status: 200, error: null, response: results}, null, 2));
    }
  });
});

router.get("/:id", (req, res) => {
  // TODO add comma-delimited multi-id support
  let movieId = parseInt(req.params.id, 10);  // Take care, this can return NaN
  if (movieId < 1) movieId = 0;
  res.locals.connection.query(sprintf(qry, `WHERE movie.id = ?`), [movieId],
    (error, results) => {
    res.setHeader("Content-Type", "application/json");
    if (error) {
      res.send(JSON.stringify({status: 500, error: error, response: null}, null, 2));
    } else {
      res.send(JSON.stringify({status: 200, error: null, response: results}, null, 2));
    }
  });
});

const insertMovieQry = `
  INSERT INTO movie
    (created, updated, title, prodcode, genreid, ratingid, createdby)
  VALUES
    (NOW(), NOW(), ?, ?, ?, ?, ?)
`;

const insertTagsQry = `
  INSERT INTO map_movie_tag
    (created, updated, movieid, tagid)
  VALUES
`;

router.post("/add", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // Require data
  if (req.body.title.length === 0 ||
      req.body.prodcode.length === 0 ||
      req.body.genreid < 1 ||
      req.body.ratingid < 1 ||
      req.body.createdby < 1) {
    res.send(JSON.stringify({status: 400, error: `Bad arguments`, response: null}, null, 2));
    return;
  }

  res.locals.connection.query(insertMovieQry, [
      req.body.title,
      req.body.prodcode,
      req.body.genreid,
      req.body.ratingid,
      req.body.createdby,
    ],
    (error, results) => {
      if (error) {
        res.send(JSON.stringify({status: 500, error: error, response: null}, null, 2));
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
                res.send(JSON.stringify({status: 500, error: error, response: newMovieId}, null, 2));
              } else {
                res.send(JSON.stringify({status: 201, error: null, response: newMovieId}, null, 2));
              }
            }
          )
        } else {
          // Because queries are async if the tags fail this will be sent before the failure happens.
          res.send(JSON.stringify({status: 201, error: null, response: newMovieId}, null, 2));
        }
      }
    });
});

module.exports = router;
