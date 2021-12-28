import express from "express";
import { getCurrentData, getDataFromSearch } from "../controllers/controllers";

const router = express.Router();

router.route("/").get(getCurrentData);

router.route("/:query").get(getDataFromSearch);

export default router;
