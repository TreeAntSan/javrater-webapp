import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mysql from "mysql";

import indexRouter from "./routes/index";
import apiRouter from "./routes/api";

const app = express();

// Database connection
app.use((req, res, next) => {
  res.locals.connection = mysql.createConnection({
    host     : "localhost",
    database : process.env.MOVIE ? "movierater" : "javrater",
    user     : process.env.MOVIE ? "movierater" : "javrater",
    password : process.env.RATER_MYSQL_PASSWORD || "password",
  });
  res.locals.connection.connect();
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("*", indexRouter);

module.exports = app;
