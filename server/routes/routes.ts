import express from "express";
import { getCurrentData } from "../controllers/controllers";

const router = express.Router();

router.route("/").get(getCurrentData);

export default router;
