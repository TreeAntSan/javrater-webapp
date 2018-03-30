import express from "express";
const router = express.Router();

import v1Router from "./v1/router";

router.use("/v1", v1Router);

module.exports = router;
