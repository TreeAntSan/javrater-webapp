import express from "express";
const router = express.Router();

import genreRouter from './genre';
import ratingRouter from "./rating";
import tagRouter from "./tag";
import javRouter from "./jav";
import userRouter from "./user";
import javtagsRouter from "./javtags";

router.use("/genre", genreRouter);
router.use("/rating", ratingRouter);
router.use("/tag", tagRouter);
router.use("/jav", javRouter);
router.use("/user", userRouter);
router.use("/javtags", javtagsRouter);

module.exports = router;