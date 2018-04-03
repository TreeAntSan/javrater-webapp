-- Import this with `mysql -u root -p < movierater.sql`

CREATE DATABASE IF NOT EXISTS movierater;
USE movierater;

CREATE TABLE IF NOT EXISTS rating
(
  id                    INTEGER unsigned NOT NULL AUTO_INCREMENT,
  created               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  updated               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  rating                VARCHAR(32) NOT NULL DEFAULT '',
  description           VARCHAR(256) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS genre
(
  id                    INTEGER unsigned NOT NULL AUTO_INCREMENT,
  created               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  updated               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  code                  VARCHAR(32) NOT NULL DEFAULT '',
  description           VARCHAR(256) NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  UNIQUE KEY code (code ASC)
);

CREATE TABLE IF NOT EXISTS tag
(
  id                    INTEGER unsigned NOT NULL AUTO_INCREMENT,
  created               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  updated               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  category              VARCHAR(64) NOT NULL DEFAULT '',
  tag                   VARCHAR(16) NOT NULL DEFAULT '',
  name                  VARCHAR(64) NOT NULL DEFAULT '',
  description           VARCHAR(512) NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  UNIQUE KEY tag (tag ASC)
);

CREATE TABLE IF NOT EXISTS movie
(
  id                    INTEGER unsigned NOT NULL AUTO_INCREMENT,
  created               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  updated               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  title                 VARCHAR(256) NOT NULL DEFAULT '',
  prodcode              VARCHAR(16) NOT NULL DEFAULT '',
  ratingid              INTEGER unsigned,
  genreid               INTEGER unsigned,
  createdby             INTEGER unsigned,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS map_movie_tag
(
  id                    INTEGER unsigned NOT NULL AUTO_INCREMENT,
  created               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  updated               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  movieid               INTEGER unsigned,
  tagid                 INTEGER unsigned,
  PRIMARY KEY (id),
  UNIQUE INDEX m_t (movieid, tagid)
);

CREATE TABLE IF NOT EXISTS user
(
  id                    INTEGER unsigned NOT NULL AUTO_INCREMENT,
  created               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  updated               DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00',
  name                  VARCHAR(64) NOT NULL DEFAULT '',
  password              VARCHAR(60) NOT NULL DEFAULT '',
  type                  INTEGER unsigned NOT NULL DEFAULT 0,
  status                INTEGER unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY name (name ASC)
);
