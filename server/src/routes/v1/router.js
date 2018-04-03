import express from "express";
const router = express.Router();

import genreRouter from './genre';
import ratingRouter from "./rating";
import tagRouter from "./tag";
import movieRouter from "./movie";
import userRouter from "./user";
import movietagsRouter from "./movietags";

router.use("/genre", genreRouter);
router.use("/rating", ratingRouter);
router.use("/tag", tagRouter);
router.use("/movie", movieRouter);
router.use("/user", userRouter);
router.use("/movietags", movietagsRouter);

module.exports = router;